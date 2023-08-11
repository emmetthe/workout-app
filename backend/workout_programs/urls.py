from django.urls import path
from . import views

urlpatterns = [
    path('workouts/', views.WorkoutProgramViewSet.as_view(), name="get-all-workouts-view"),
    path('workout/<int:pk>/', views.WorkoutProgramViewSet.as_view(), name="get-workout-view"),
    path('create/', views.WorkoutProgramViewSet.as_view(), name="create-workout-view"),
    path('update/<int:pk>/', views.WorkoutProgramViewSet.as_view(), name="update-workout-view"),
    path('delete/<int:pk>/', views.WorkoutProgramViewSet.as_view(), name="delete-workout-view"),
]
