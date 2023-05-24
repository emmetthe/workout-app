import React from 'react';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { UpdateProfileAsync, delAccountAsync } from '../slices/authSlice';

const Dashboard = () => {
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   city: ''
  // });
  // const { firstName, lastName, phone, city } = formData;

  // const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const profile = useSelector((state) => state.auth.profile);
  const { firstName, lastName } = profile;

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleDeleteAccount = (e) => {
  //   e.preventDefault();
  //   dispatch(delAccountAsync());
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(UpdateProfileAsync({ firstName, lastName, phone, city }));
  //   if (error === '') {
  //     console.log('Profile Updated Successfully');
  //   }
  // };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{error ? `Trouble getting profile: ${error}` : null}</h2>
      <h1>Welcome back, {firstName}</h1>

      <form></form>
      <button type="submit">Update Profile</button>
    </div>
  );
};

export default Dashboard;
