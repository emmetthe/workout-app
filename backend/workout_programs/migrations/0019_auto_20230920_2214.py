# Generated by Django 3.2.20 on 2023-09-20 22:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0018_auto_20230906_2310'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='set',
            name='exercise_in_program',
        ),
        migrations.RemoveField(
            model_name='exerciseinprogram',
            name='sets',
        ),
        migrations.AddField(
            model_name='exerciseinprogram',
            name='sets',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='exercise_sets', to='workout_programs.set'),
            preserve_default=False,
        ),
    ]
