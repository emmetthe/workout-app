# Generated by Django 3.2.20 on 2023-08-23 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0012_rename_program_exerciseinprogram_program_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exerciseinprogram',
            name='exercise',
        ),
        migrations.AddField(
            model_name='exerciseinprogram',
            name='category',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='exerciseinprogram',
            name='exercise_name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='exerciseinprogram',
            name='target',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.DeleteModel(
            name='Exercise',
        ),
    ]
