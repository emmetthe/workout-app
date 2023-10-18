import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';

const EditExercisePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { exercise } = location.state;
  const [editedSets, setEditedSets] = useState([...exercise.sets]);

  const handleInputChange = (index, field, value) => {
    const updatedSets = [...editedSets];
    updatedSets[index][field] = value;
    setEditedSets(updatedSets);
  };

  const handleSaveClick = () => {
    // onUpdateSets(editedSets);
  };

  const handleCancelClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const styles = {
    buttonStyling: {
      marginTop: '20px',
      // display: 'flex',
      // justifyContent: 'center'
    },
    buttonWidth: {
      width: '120px',
      margin: '5px'
    },

    labelStyling: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    setNumStyling: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Sets
      </Typography>

      <Typography variant="h5">{exercise.exercise.exerciseName}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant="body1" style={styles.labelStyling}>
            Set
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body1" style={styles.labelStyling}>
            Reps
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body1" style={styles.labelStyling}>
            Weight (lbs)
          </Typography>
        </Grid>
      </Grid>

      {editedSets.map((set, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={2} style={styles.setNumStyling}>
            <Typography variant="body1">
              {index + 1}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={set.reps}
              onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={set.weight}
              onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Container style={styles.buttonStyling}>
        <Button variant="contained" color="primary" style={styles.buttonWidth} onClick={handleSaveClick}>
          Update
        </Button>
        <Button variant="contained" color="default" style={styles.buttonWidth} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Container>
    </Container>
  );
};

export default EditExercisePage;
