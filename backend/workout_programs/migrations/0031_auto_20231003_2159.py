# Generated by Django 3.2.20 on 2023-10-03 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0030_rename_set_setinexercise'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exerciseinprogram',
            name='sets',
        ),
        migrations.AddField(
            model_name='exerciseinprogram',
            name='sets',
            field=models.ManyToManyField(to='workout_programs.SetInExercise'),
        ),
    ]