import React from 'react';
// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateProfileAsync } from '../../slices/authSlice';
import ModalForm from '../modal/modal';
import { showModal } from '../../slices/modalSlice';
import { Button, Grid } from '@mui/material';
import UpdateProfileForm from './updateProfileForm';
import WorkoutProgram from '../workout-program/workoutProgram';

const Dashboard = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const profile = useSelector((state) => state.auth.profile);
  const modalState = useSelector((state) => state.modal);

  const handleOpen = () => dispatch(showModal(true));
  const handleClose = () => dispatch(showModal(false));

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    handleClose();
    dispatch(UpdateProfileAsync(formData));
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{errors ? `Trouble getting profile: ${errors}` : null}</h2>
      <h1>Welcome back, {profile.firstName}</h1>

      <Button variant="outlined" onClick={handleOpen}>
        Update Profile
      </Button>

      {/* displaying user's workout programs */}
      <Grid item>
        <WorkoutProgram />
      </Grid>

      <ModalForm
        componentForm={<UpdateProfileForm handleClose={handleClose} handleSubmit={handleSubmit} />}
        modalState={modalState}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Dashboard;
