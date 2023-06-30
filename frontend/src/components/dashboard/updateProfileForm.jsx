import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { CloseButtonStyle } from './profileFormStyle';

const UpdateProfileForm = ({ handleSubmit, handleClose }) => {
  const { firstName, lastName, phone, city } = useSelector((state) => state.auth.profile);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    city,
    phone
  });
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={(e) => handleSubmit(e, formData)}>
        <Button sx={CloseButtonStyle} onClick={handleClose}>
          <CloseIcon />
        </Button>

        <TextField
          id="outlined-helperText"
          label="First Name"
          margin="normal"
          name="firstName"
          defaultValue={firstName}
          onChange={onChange}
        />

        <TextField id="outlined-helperText" label="Last Name" margin="normal" name="lastName" defaultValue={lastName} onChange={onChange} />

        <TextField id="outlined-helperText" label="City" margin="normal" name="city" defaultValue={city} onChange={onChange} />

        <TextField id="outlined-helperText" label="Phone" margin="normal" name="phone" defaultValue={phone} onChange={onChange} />

        <Button variant="outlined" type="submit" onClick={(e) => handleSubmit(e, formData)}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
