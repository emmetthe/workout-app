# Generated by Django 3.2.20 on 2023-09-20 22:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0022_remove_exerciseinprogram_sets'),
    ]

    operations = [
        migrations.AddField(
            model_name='exerciseinprogram',
            name='sets',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='exercise_sets', to='workout_programs.set'),
        ),
    ]
