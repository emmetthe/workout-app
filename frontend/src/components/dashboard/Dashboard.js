import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateProfileAsync } from '../../slices/authSlice';
import ModalForm from '../modal/modal';
import { Button, Grid, Typography } from '@mui/material';
import UpdateProfileForm from './updateProfileForm';
import WorkoutProgram from '../workout-program/workoutProgram';

const styles = {
  container: {
    padding: '20px'
  },
  header: {
    marginBottom: '20px'
  },
  welcome: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  button: {
    marginBottom: '20px'
  }
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    closeModal();
    dispatch(UpdateProfileAsync(formData));
  };

  return (
    <Grid container direction="column" alignItems="center" style={styles.container}>
      <Typography variant="h4" style={styles.header}>
        Profile Page
      </Typography>
      <Typography variant="h1" style={styles.welcome}>
        Welcome back, {profile.firstName}
      </Typography>

      <Button variant="outlined" onClick={openModal} style={styles.button}>
        Update Profile
      </Button>

      {/* displaying user's workout programs */}
      <Grid item>
        <WorkoutProgram />
      </Grid>

      <ModalForm
        componentForm={<UpdateProfileForm handleClose={closeModal} handleSubmit={handleSubmit} />}
        modalState={modalOpen}
        handleClose={closeModal}
      />
    </Grid>
  );
};

export default Dashboard;
