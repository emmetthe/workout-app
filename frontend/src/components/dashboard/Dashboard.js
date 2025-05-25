import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateProfileAsync } from '../../slices/authSlice';
import ModalForm from '../modal/modal';
import UpdateProfileForm from './updateProfileForm';
import WorkoutProgram from '../workout-program/workoutProgram';
import Spinner from '../spinner/spinner';

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
    <div className="flex flex-col items-center p-5 mx-auto mt-12 min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <>
         <h1 className="mb-5 text-6xl text-gray-100 text-center">Profile</h1>

          <button className="mb-1 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80" onClick={openModal}>
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
