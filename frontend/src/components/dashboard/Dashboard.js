import React from 'react';
// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateProfileAsync } from '../../slices/authSlice';
import ModalForm from '../modal/modal';
import { showModal } from '../../slices/modalSlice';
import Button from '@mui/material/Button';
import UpdateProfileForm from './updateProfileForm';

const Dashboard = () => {
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   city: ''
  // });
  // const { firstName, lastName, phone, city } = formData;

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const profile = useSelector((state) => state.auth.profile);
  const modalState = useSelector((state) => state.modal);

  // const handleDeleteAccount = (e) => {
  //   e.preventDefault();
  //   dispatch(delAccountAsync());
  // };

  const handleOpen = () => dispatch(showModal(true));
  const handleClose = () => dispatch(showModal(false));

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    handleClose();
    dispatch(UpdateProfileAsync(formData));
    if (errors === '') {
      console.log('Profile Updated Successfully');
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{errors ? `Trouble getting profile: ${errors}` : null}</h2>
      <h1>Welcome back, {profile.firstName}</h1>

      <Button variant="outlined" onClick={handleOpen}>
        Update Profile
      </Button>

      <ModalForm
        componentForm={<UpdateProfileForm handleClose={handleClose} handleSubmit={handleSubmit} />}
        modalState={modalState}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Dashboard;
