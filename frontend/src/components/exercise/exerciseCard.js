import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
  exerciseCard: {
    textDecoration: 'none',
    color: 'inherit'
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: 8,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
    }
  },
  cardContent: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 16
    }
  }
};

const ExerciseCard = ({ exercise }) => {
  const { exercise_name, Category, target } = exercise;
  const { Primary, Secondary } = target;
  const targetMuscles = [...(Primary || []), ...(Secondary || [])];

  return (
    <Link to={{ pathname: `/exercise/${exercise_name.replaceAll(' ', '-')}` }} state={exercise} style={styles.exerciseCard}>
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <Typography variant="h6">{exercise_name}</Typography>
          <Typography variant="subtitle1">Type: {Category}</Typography>
          {targetMuscles.length > 0 ? (
            <Typography variant="subtitle1">Muscles Targeted: {targetMuscles.join(', ')}</Typography>
          ) : (
            <Typography variant="subtitle1">Muscles Targeted: N/A </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
