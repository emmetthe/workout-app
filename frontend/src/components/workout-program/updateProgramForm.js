import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const formContainerStyle = {
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
};

const UpdateProgramForm = ({ initialName, initialDescription, onUpdate }) => {
  const [updatedName, setUpdatedName] = useState(initialName);
  const [updatedDescription, setUpdatedDescription] = useState(initialDescription);

  const handleUpdate = () => {
    onUpdate({
      name: updatedName,
      description: updatedDescription
    });
  };

  return (
    <div style={formContainerStyle}>
      <TextField
        label="Program Name"
        variant="outlined"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        multiline
        style={{ marginBottom: '16px' }}
      />
      <Button variant="outlined" color="primary" onClick={handleUpdate}>
        Update Program
      </Button>
    </div>
  );
};

export default UpdateProgramForm;
