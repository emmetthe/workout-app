import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateProfileAsync } from '../../slices/authSlice';
import ModalForm from '../modal/modal';
import UpdateProfileForm from './updateProfileForm';
import WorkoutProgram from '../workout-program/workoutProgram';

const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile || !Object.keys(profile).length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [profile]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    dispatch(UpdateProfileAsync(formData)).then(() => {
      closeModal();
    });
  };

  return (
    <div className="flex flex-col items-center p-5 mt-12">
      {loading ? (
        <div className="flex justify-center items-center h-52">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h4 className="mb-5 text-4xl font-semibold text-gray-100">Profile Page</h4>
          <h1 className="mb-5 text-6xl font-bold text-gray-100">Welcome back, {profile.firstName}</h1>

          <button className="mb-5 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80" onClick={openModal}>
            Update Profile
          </button>

          {/* displaying user's workout programs */}
          <div>
            <WorkoutProgram />
          </div>

          {/* update user details form */}
          <ModalForm
            componentForm={<UpdateProfileForm handleClose={closeModal} handleSubmit={handleSubmit} backDropStatus={false} />}
            modalState={modalOpen}
            handleClose={closeModal}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
