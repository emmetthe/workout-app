import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';

const ExercisePage = () => {
  const location = useLocation();
  const exercise = location.state;
  const { videoURL, steps, target, exercise_name, Category, Difficulty } = exercise;
  const { Primary, Secondary } = target;
  const targetMuscles = [...(Primary || []), ...(Secondary || [])];

  // create a ref for each URL in the videoURL array, refs will be used to access the video
  const videoRefs = useRef(videoURL.map(() => React.createRef()));
  // initialized as an array of booleans to determine whether each video should be shown or hidden on the page.
  const [showVideos, setShowVideos] = useState(videoURL.map(() => false));

  const toggleVideo = (index) => {
    setShowVideos((prevShowVideos) => {
      const updatedShowVideos = [...prevShowVideos];
      updatedShowVideos[index] = !updatedShowVideos[index];
      return updatedShowVideos;
    });
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {exercise && (
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
                    <Button onClick={() => toggleVideo(index)} variant="contained" color="primary">
                      {showVideos[index] ? 'Hide Video' : 'Show Video'}
                    </Button>
                  </Grid>

                  {showVideos[index] && (
                    <Grid item>
                      <Grid container justifyContent="center">
                        <video ref={videoRefs.current[index]} width="600" height="auto" controls autoPlay>
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
      )}
    </Grid>
  );
};

export default ExercisePage;
