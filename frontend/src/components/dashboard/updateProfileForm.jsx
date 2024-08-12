import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
// import { FaTimes } from 'react-icons/fa';

const UpdateProfileForm = ({ handleSubmit, handleClose, backDropStatus }) => {
  const { firstName, lastName, bodyWeight, bodyWtInLbs } = useSelector((state) => state.auth.profile);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    bodyWeight,
    bodyWtInLbs
  });
  const errors = useSelector((state) => state.errors);
  const [backdrop, setBackDrop] = useState(backDropStatus);

  const closeBackdrop = () => {
    setBackDrop(false);
  };
  const openBackdrop = () => {
    setBackDrop(true);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="relative p-4 bg-white max-w-lg mx-auto" autoComplete="off" onSubmit={(e) => handleSubmit(e, formData)}>
        {/* <button type="button" className="absolute top-3 right-2 p-1 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          <FaTimes className="h-6 w-6" />
        </button> */}

        {errors && <div className="text-red-600 text-sm">{errors}</div>}

        {/* dim screen w/ spinner when updating */}
        {backdrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={closeBackdrop}>
            <Spinner />
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={firstName}
              onChange={onChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={lastName}
              onChange={onChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Filler items for future */}
        {/* <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="filler1" className="text-sm font-medium text-gray-700">
              Filler Box
            </label>
            <input
              type="text"
              id="filler1"
              name="filler1"
              defaultValue="filler"
              onChange={onChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="filler2" className="text-sm font-medium text-gray-700">
              Filler Box
            </label>
            <input
              type="text"
              id="filler2"
              name="filler2"
              defaultValue="filler"
              onChange={onChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div> */}
        {/* End of filler items */}

        <div className="flex flex-col mt-4">
          <label htmlFor="bodyWeight" className="text-sm font-medium text-gray-700">
            Body Weight
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              id="bodyWeight"
              name="bodyWeight"
              defaultValue={bodyWeight}
              onChange={onChange}
              className="p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">{bodyWtInLbs ? 'lbs' : 'kg'}</span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={(e) => {
            handleSubmit(e, formData);
            openBackdrop();
          }}
        >
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateProfileForm;
