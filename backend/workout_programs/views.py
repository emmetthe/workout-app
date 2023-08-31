from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise, WorkoutProgram, ExerciseInProgram, DayOfWeek
from .serializers import ExerciseSerializer, WorkoutProgramSerializer, ExerciseInProgramSerializer, DayOfWeekSerializer
from datetime import datetime
from django.shortcuts import get_object_or_404

class ExerciseViewSet(APIView):
    """API endpoints for managing exercises."""

    def get(self, request):
        queryset = Exercise.objects.all()
        serializer = ExerciseSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class DayOfWeekViewSet(APIView):
    """API endpoints for managing days of the week."""

    def get(self, request):
        queryset = DayOfWeek.objects.all()
        serializer = DayOfWeekSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DayOfWeekSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ExerciseInProgramViewSet(APIView):
    """API endpoints for managing exercises within workout programs."""

    def get(self, request):
        queryset = ExerciseInProgram.objects.all()
        serializer = ExerciseInProgramSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExerciseInProgramSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
 
    def delete(self, request, program_id, ExerciseInProgram_id):
        try:
            exercise_in_program = ExerciseInProgram.objects.get(
                program_id=program_id,
                id=ExerciseInProgram_id
            )
            if exercise_in_program.program.user != request.user:
                return Response({"error": "You do not have permission to delete this exercise"}, status=status.HTTP_403_FORBIDDEN)

            exercise_in_program.delete()
            return Response({"success": "Exercise successfully removed from program."}, status=status.HTTP_204_NO_CONTENT)

        except ExerciseInProgram.DoesNotExist:
            return Response({'error': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Something went wrong when deleting the exercise', 'details': str(e)})

class WorkoutProgramViewSet(APIView):
    """API endpoints for managing workout programs."""

    def get(self, request):
        queryset = WorkoutProgram.objects.filter(user=request.user).order_by('id')
        serializer = WorkoutProgramSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_single_workout(self, request, pk):
        queryset = WorkoutProgram.objects.filter(user=request.user, pk=pk)
        workout_program = queryset.first()
        if not workout_program:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = WorkoutProgramSerializer(workout_program)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        days_data = data.pop('days', [])

        data['user'] = request.user.id
        # data['created'] = datetime.now()

         # Check if a workout program with the same name already exists for the user
        existing_program = WorkoutProgram.objects.filter(user=request.user, name=data['name']).first()
        if existing_program:
            return Response({"error": "You currently have another program with the same name"})

        serializer = WorkoutProgramSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        workout_program = serializer.save()

        #handle days_data as a list of day names
        for day_name in days_data:
            day, created = DayOfWeek.objects.get_or_create(day_name=day_name)
            workout_program.days.add(day)

        return Response({"success": "Workout program created successfully."}, status=status.HTTP_201_CREATED)
    
    def put(self, request, pk):
        try:
            instance = WorkoutProgram.objects.get(pk=pk)
            if instance.user != request.user:
                return Response({"error": "Workout program not found with associated user."}, status=status.HTTP_403_FORBIDDEN)

            data = request.data.copy()
            # Extract exercises data, empty if exercise has not been created yet
            exercises_data = data.pop('exercise', []) 

            # Update the fields you want to update in the instance
            instance.name = data.get('name', instance.name)
            instance.description = data.get('description', instance.description)
            instance.updated = datetime.now()
            instance.save()

            exercise_id = None
            exercise_name = None
            category = None
            target = None
            sets = data['sets']
            reps = data['reps']
            weight = data['weight']
            if exercises_data:
                # If exercise is being edited in program 
                exercise_id = exercises_data['id']
                exercise_name = exercises_data['exercise_name']
                category = exercises_data['category']
                target = exercises_data['target']
            else:
                exercise_id = data['id']
                exercise_name = data['exercise_name']
                category = data['category']
                target = data['target']
    
            # Check if the exercise with the given ID already exists, or create it
            exercise, created = Exercise.objects.get_or_create(id=exercise_id, defaults={'exercise_name': f"{exercise_name}",'category': f"{category}", 'target': f"{target}"})

            # Create or update ExerciseInProgram instance
            exercise_in_program, _ = ExerciseInProgram.objects.get_or_create(
                exercise=exercise,
                program=instance,
                defaults={'sets': sets, 'reps': reps, 'weight': weight}
            )

            if not created:
                # Update the existing exercise if it already exists
                exercise_in_program.sets = sets
                exercise_in_program.reps = reps
                exercise_in_program.weight = weight
                exercise_in_program.save()

            serializer = WorkoutProgramSerializer(instance)
            return Response(serializer.data)
        except WorkoutProgram.DoesNotExist:
            return Response({'error': 'Workout program not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Something went wrong when updating the workout program', 'details': str(e)})


    def delete(self, request, pk):
        instance = WorkoutProgram.objects.get(pk=pk)
        if instance.user != request.user:
            return Response({"error": "Workout program not found"}, status=status.HTTP_403_FORBIDDEN)
        instance.delete()
        return Response({"success": "Workout program deleted successfully."},status=status.HTTP_204_NO_CONTENT)
