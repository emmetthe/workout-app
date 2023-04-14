from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    email = models.EmailField(max_length=50, blank=True, unique=True)
    body_weight = models.IntegerField(blank=True, null=True, default=None)
    body_weight_in_lbs = models.BooleanField(default=True)

    def __str__(self):
        return self.first_name
