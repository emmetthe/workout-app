import React from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { CloseButtonStyle } from './profileFormStyle';

const UpdateProfileForm = ({ handleSubmit, handleClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    phone: ''
  });
  const dispatch = useDispatch();
  const inputRef = useRef('');
  const errors = useSelector((state) => state.errors);
  const { firstName, lastName, phone, city } = useSelector((state) => state.auth.profile);

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Button sx={CloseButtonStyle} onClick={handleClose}>
          <CloseIcon />
        </Button>

        <TextField id="outlined-helperText" label="First Name" margin="normal" defaultValue={firstName} />

        <TextField id="outlined-helperText" label="Last Name" margin="normal" defaultValue={lastName} />

        <TextField id="outlined-helperText" label="City" margin="normal" defaultValue={city} />

        <TextField id="outlined-helperText" label="Phone" margin="normal" defaultValue={phone} />

        <Button variant="outlined" type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
