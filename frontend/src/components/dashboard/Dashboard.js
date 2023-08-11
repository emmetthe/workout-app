import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateProfileAsync } from '../../slices/authSlice';
import ModalForm from '../modal/modal';
import { Button, Grid } from '@mui/material';
import UpdateProfileForm from './updateProfileForm';
import WorkoutProgram from '../workout-program/workoutProgram';

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
    <div>
      <h1>Profile Page</h1>
      <h1>Welcome back, {profile.firstName}</h1>

      <Button variant="outlined" onClick={openModal}>
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
    </div>
  );
};

export default Dashboard;
