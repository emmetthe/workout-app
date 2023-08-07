from django.urls import path
from . import views

urlpatterns = [
    path('workouts/', views.GetAllWorkouts.as_view(), name="get-all-workouts-view"),
    path('workout/', views.GetSingleWorkout.as_view(), name="get-workout-view"),
    path('create/', views.CreateWorkout.as_view(), name="create-workout-view"),
    path('update/', views.UpdateWorkout.as_view(), name="update-workout-view"),
]