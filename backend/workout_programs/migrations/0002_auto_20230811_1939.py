# Generated by Django 3.2.20 on 2023-08-11 19:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workoutprogram',
            name='days',
        ),
        migrations.AddField(
            model_name='workoutprogram',
            name='day',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='workout_programs.dayofweek'),
        ),
    ]
