# Generated by Django 3.2.20 on 2023-08-11 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0005_alter_workoutprogram_day'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workoutprogram',
            name='day',
        ),
        migrations.AddField(
            model_name='workoutprogram',
            name='days',
            field=models.ManyToManyField(blank=True, related_name='workout_programs', to='workout_programs.DayOfWeek'),
        ),
    ]
