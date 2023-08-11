from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise, WorkoutProgram, ExerciseInProgram, DayOfWeek
from .serializers import ExerciseSerializer, WorkoutProgramSerializer, ExerciseInProgramSerializer, DayOfWeekSerializer
from datetime import datetime

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

class WorkoutProgramViewSet(APIView):
    """API endpoints for managing workout programs."""

    def get(self, request):
        queryset = WorkoutProgram.objects.filter(user=request.user)
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
        data['created'] = datetime.now()
        serializer = WorkoutProgramSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        workout_program = serializer.save()

        #handle days_data as a list of day names
        for day_name in days_data:
            day, created = DayOfWeek.objects.get_or_create(day_name=day_name)
            workout_program.days.add(day)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        instance = WorkoutProgram.objects.get(pk=pk)
        if instance.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        data = request.data.copy()
        data['updated'] = datetime.now()
        serializer = WorkoutProgramSerializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = WorkoutProgram.objects.get(pk=pk)
        if instance.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
