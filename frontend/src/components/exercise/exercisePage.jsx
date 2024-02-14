import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { updateWorkout } from '../../slices/workoutThunk';
import AddExerciseForm from './addExerciseForm';
import ModalForm from '../modal/modal';
import { useDispatch } from 'react-redux';

const ExercisePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const exercise = location.state;
  const { videoURL, steps, target, exercise_name, Category, Difficulty } = exercise;
  const { Primary, Secondary } = target;
  const targetMuscles = [...(Primary || []), ...(Secondary || [])];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // create refs object to store video refs
  const videoRefs = useRef({});

  // initialized as a dictionary to determine whether each video should be shown or hidden on the page.
  const [showVideos, setShowVideos] = useState(
    videoURL.reduce((acc, url) => {
      acc[url] = false;
      return acc;
    }, {})
  );

  const toggleVideo = (url) => {
    setShowVideos((prevShowVideos) => ({
      ...prevShowVideos,
      [url]: !prevShowVideos[url]
    }));
  };

  const handleAddToProgram = (exerciseData, programId) => {
    // Dispatch an action to update the workout program in the Redux store
    dispatch(updateWorkout(exerciseData, programId, true));
    setSelectedProgram(null);
    // Close the modal after adding the exercise
    closeModal();
  };

  const openModal = () => {
    setSelectedProgram(null); // Reset selected program when opening modal
    setModalOpen(true);
  };

  const selectProgram = (program) => {
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedProgram(null);
    setModalOpen(false);
  };

  return (
    <Grid container direction="column" spacing={2} style={{ marginTop: '50px', alignItems: 'center' }}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={openModal}>
          Add to Workout Program
        </Button>
      </Grid>

      <ModalForm
        componentForm={
          <AddExerciseForm
            handleClose={closeModal}
            handleAddToProgram={handleAddToProgram}
            exercise={exercise}
            selectedProgram={selectedProgram}
            selectProgram={selectProgram}
            setSelectedProgram={setSelectedProgram}
          />
        }
        modalState={modalOpen}
        handleClose={closeModal}
      />

      <Grid item>
        {/* general information */}
        <Typography variant="h4">{exercise_name}</Typography>
        {Difficulty ? (
          <Typography variant="subtitle1">Difficulty: {Difficulty}</Typography>
        ) : (
          <Typography variant="subtitle1">Difficulty: N/A</Typography>
        )}
        <Typography variant="subtitle1">Type: {Category}</Typography>
        {targetMuscles.length > 0 && (
          <Typography variant="subtitle1">
            Muscles Targeted: {targetMuscles.map((muscle, i) => muscle + `${i !== targetMuscles.length - 1 ? ', ' : ''}`)}
          </Typography>
        )}

        <Typography variant="h6">Instructions:</Typography>
        <ol>
          {steps.map((step, i) => (
            <li key={i}>
              <Typography variant="body1">{step}</Typography>
            </li>
          ))}
        </ol>

        {/* Add more information about the exercise here */}

        {/* video player */}
        <Grid container direction="column" alignItems="center" spacing={2}>
          {videoURL.map((url, index) => (
            <Grid item key={index}>
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <Button onClick={() => toggleVideo(url)} variant="contained" color="primary">
                    {showVideos[url] ? 'Hide Video' : 'Show Video'}
                  </Button>
                </Grid>

                {showVideos[url] && (
                  <Grid item>
                    <Grid container justifyContent="center">
                      <video ref={(el) => (videoRefs.current[url] = el)} width="600" height="auto" controls autoPlay>
                        <source src={url} />
                      </video>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExercisePage;
