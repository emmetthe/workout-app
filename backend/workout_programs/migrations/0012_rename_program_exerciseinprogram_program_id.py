# Generated by Django 3.2.20 on 2023-08-23 02:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0011_rename_name_exercise_exercise_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='exerciseinprogram',
            old_name='program',
            new_name='program_id',
        ),
    ]