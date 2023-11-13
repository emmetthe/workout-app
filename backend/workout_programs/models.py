from django.db import models
from django.contrib.auth.models import User

class DayOfWeek(models.Model):
    day_name = models.CharField(max_length=15)

    def __str__(self):
        return self.day_name
    
class SetInExercise(models.Model):
    set_number = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    exercise_id = models.PositiveIntegerField()

    def __str__(self):
        return f"Set {self.set_number}-exercise id:{self.exercise_id}"

class Exercise(models.Model):
    exercise_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, default='', blank=True)
    target = models.CharField(max_length=100, default='', blank=True)

    def __str__(self):
        return self.exercise_name

class WorkoutProgram(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(default='', blank=True)
    days = models.ManyToManyField(DayOfWeek, related_name='workout_programs', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ExerciseInProgram(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    program = models.ForeignKey(WorkoutProgram, related_name='exercises', on_delete=models.CASCADE)
    sets = models.ManyToManyField(SetInExercise)

    def __str__(self):
        return f"{self.exercise.exercise_name} in {self.program.name}"

