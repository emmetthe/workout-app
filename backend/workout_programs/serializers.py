from rest_framework import serializers
from .models import Exercise, WorkoutProgram, ExerciseInProgram, DayOfWeek

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class DayOfWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayOfWeek
        fields = '__all__'

class ExerciseInProgramSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = ExerciseInProgram
        fields = '__all__'

class WorkoutProgramSerializer(serializers.ModelSerializer):
    exercises = ExerciseInProgramSerializer(many=True, read_only=True)
    days = DayOfWeekSerializer(many=True, read_only=True)

    class Meta:
        model = WorkoutProgram
        fields = '__all__'
