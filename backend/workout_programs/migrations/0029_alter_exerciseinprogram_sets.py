# Generated by Django 3.2.20 on 2023-09-25 21:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout_programs', '0028_alter_exerciseinprogram_sets'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exerciseinprogram',
            name='sets',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workout_programs.set'),
        ),
    ]