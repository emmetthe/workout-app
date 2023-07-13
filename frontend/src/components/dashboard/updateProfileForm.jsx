import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { CloseButtonStyle } from './profileFormStyle';

const UpdateProfileForm = ({ handleSubmit, handleClose }) => {
  const { firstName, lastName, bodyWeight, height } = useSelector((state) => state.auth.profile);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    bodyWeight,
    height
  });
  // const dispatch = useDispatch();
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

        {errors ? <>{errors}</> : null}

        <TextField
          id="outlined-helperText"
          label="First Name"
          margin="normal"
          name="firstName"
          defaultValue={firstName}
          onChange={onChange}
        />

        <TextField id="outlined-helperText" label="Last Name" margin="normal" name="lastName" defaultValue={lastName} onChange={onChange} />

        <TextField id="outlined-helperText" label="height" margin="normal" name="height" defaultValue={height} onChange={onChange} />

        <TextField
          id="outlined-helperText"
          label="Body Weight"
          margin="normal"
          name="bodyWeight"
          defaultValue={bodyWeight}
          onChange={onChange}
        />

        <Button variant="outlined" type="submit" onClick={(e) => handleSubmit(e, formData)}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
