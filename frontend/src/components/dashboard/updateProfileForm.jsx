import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const UpdateProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: ''
  });
  const { firstName, lastName } = formData;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errors);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          First Name:
          <input className="form-control" type="text" onChange={(e) => onChange(e)} value={firstName} />
        </label>

        <label>
          Last Name:
          <input className="form-control" type="text" onChange={(e) => onChange(e)} value={lastName} />
        </label>

        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateProfileForm;
