# Generated by Django 3.2.20 on 2023-08-23 01:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0010_auto_20230821_2223'),
    ]

    operations = [
        migrations.RenameField(
            model_name='exercise',
            old_name='name',
            new_name='exercise_name',
        ),
    ]
