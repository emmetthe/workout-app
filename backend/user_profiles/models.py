from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    body_weight = models.CharField(max_length=20, default='')
    body_wt_in_lbs = models.BooleanField(default=True)
    lifting_wt_in_lbs = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user}'

    def save(self, *args, **kwargs):
        if self.first_name == "":
            self.first_name = f"{self.user}"
        if self.last_name == "":
            self.last_name = f"{self.user}"
        super().save(*args, **kwargs)
