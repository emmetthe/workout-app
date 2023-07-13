from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Days(models.Model):
    day = models.CharField(max_length=8)

class Exercise(models.Model):
    name = models.CharField(max_length=255, default='')
    reps = models.CharField(max_length=255, default='')
    sets = models.CharField(max_length=255, default='')


class WorkoutProgram(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default='')
    days_of_week = models.ManyToManyField(Days)
    exercises = models.ManyToManyField(Exercise)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)