from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise, WorkoutProgram, ExerciseInProgram, DayOfWeek, SetInExercise
from .serializers import ExerciseSerializer, WorkoutProgramSerializer, ExerciseInProgramSerializer, DayOfWeekSerializer, SetInExerciseSerializer
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
            # Update the fields you want to update in the instance
            instance.name = data.get('name', instance.name)
            instance.description = data.get('description', instance.description)

            # Extract the "days" field as a list of day objects
            days_data = data.get('days', [])

            # Extract the day from the day name and create a list of days 
            days = [DayOfWeek.objects.get(day_name=day) for day in days_data]
            # Set the "days" field with the updated days
            instance.days.set(days)
            instance.updated = datetime.now()
            instance.save()

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

class WorkoutProgramExerciseViewSet(APIView):
    """API endpoints for managing exercises inside workout programs."""
    def put(self, request, pk):
        try:
            instance = WorkoutProgram.objects.get(pk=pk)
            if instance.user != request.user:
                return Response({"error": "Workout program not found with associated user."}, status=status.HTTP_403_FORBIDDEN)

            data = request.data.copy()
            exercises_data = data.get('exercise', None)
            sets_data = data.get('sets', [])
            exercise_id = None
            program_id = None
            exercise_name = None
            category = None
            target = None
            # Handle Exercise data
            if exercises_data:
                # If exercise is being edited in program 
                exercise_id = exercises_data['id']
                exercise_name = exercises_data['exercise_name']
                category = exercises_data['category']
                target = exercises_data['target']
                program_id = data['program']
            else:
                exercise_id = data['id']
                exercise_name = data['exercise_name']
                category = data['category']
                target = data['target']
                program_id = data['program_id']

            exercise, created = Exercise.objects.get_or_create(id=exercise_id, defaults={'exercise_name': f"{exercise_name}",'category': f"{category}", 'target': f"{target}"})
            program = WorkoutProgram.objects.get(id=program_id)
            sets_list = []
            # Handle Sets data
            for set_data in sets_data:
                set_id = set_data.get('id', None)
                set_number = set_data.get('set_number', None)
                reps = set_data.get('reps', None)
                weight = set_data.get('weight', None)
                if set_id is not None:
                    set_instance = SetInExercise.objects.get(id=set_id, exercise_id=exercise_id)
                    if set_number is not None:
                        set_instance.set_number = set_number
                    if reps is not None:
                        set_instance.reps = reps
                    if weight is not None:
                        set_instance.weight = weight
                    set_instance.save()
                else:
                # after creating first set object, need to append current set + future sets to an array
                # currently setting 'sets' to be equal to an instance rather than appending to an array
                    set_instance = SetInExercise.objects.create(
                        # exercise_in_program=exercise_in_program,
                        set_number=set_number,
                        reps=reps,
                        weight=weight,
                        exercise_id=exercise_id
                    )
                    sets_list.append(set_instance)

            exercise_in_program, created = ExerciseInProgram.objects.get_or_create(
                exercise=exercise,
                program=program
            )
            for set_instance in sets_list:
                exercise_in_program.sets.add(set_instance)

            instance.updated = datetime.now()
            instance.save()

            serializer = WorkoutProgramSerializer(instance)
            return Response(serializer.data)
        except WorkoutProgram.DoesNotExist:
            return Response({'error': 'Workout program not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Something went wrong when updating the workout program', 'details': str(e)})