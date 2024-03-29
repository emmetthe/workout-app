import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, InputAdornment, Box, CircularProgress, Backdrop } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { CloseButtonStyle, UpdateFormTextField, UpdateFormWeight, UpdateProfileMainStyle, UpdateFormStyle } from './profileFormStyle';

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
      <Box component="form" autoComplete="off" onSubmit={(e) => handleSubmit(e, formData)} sx={UpdateProfileMainStyle}>
        <Button sx={CloseButtonStyle} onClick={handleClose}>
          <CloseIcon />
        </Button>

        {errors ? <>{errors}</> : null}

        {backdrop && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop} onClick={closeBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <Box sx={UpdateFormStyle}>
          <TextField
            id="outlined-helperText"
            label="First Name"
            margin="normal"
            name="firstName"
            defaultValue={firstName}
            onChange={onChange}
            sx={UpdateFormTextField}
          />

          <TextField
            id="outlined-helperText"
            label="Last Name"
            margin="normal"
            name="lastName"
            defaultValue={lastName}
            onChange={onChange}
            sx={UpdateFormTextField}
          />
        </Box>

        {/* filler items to add in future*/}
        {/* <Box>
          <TextField
            id="outlined-helperText"
            label="Filler Box"
            margin="normal"
            name="lastName"
            defaultValue="filler"
            onChange={onChange}
            sx={UpdateFormTextField}
          />

          <TextField
            id="outlined-helperText"
            label="Filler Box"
            margin="normal"
            name="lastName"
            defaultValue="filler"
            onChange={onChange}
            sx={UpdateFormTextField}
          />
        </Box> */}
        {/* end of filler items */}

        <Box>
          <TextField
            id="outlined-helperText"
            label="Body Weight"
            margin="normal"
            name="bodyWeight"
            defaultValue={bodyWeight}
            InputProps={{
              endAdornment: <InputAdornment position="end">{bodyWtInLbs ? 'lbs' : 'kg'}</InputAdornment>
            }}
            onChange={onChange}
            sx={UpdateFormWeight}
          />
        </Box>

        <Button
          variant="contained"
          type="submit"
          onClick={(e) => {
            handleSubmit(e, formData);
            openBackdrop();
          }}
        >
          Update
        </Button>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
