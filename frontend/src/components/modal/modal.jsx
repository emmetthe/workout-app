import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const ModalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3
};

export default function ModalForm({ componentForm, modalState, handleClose }) {
  return (
    <>
      <Modal open={modalState} onClose={handleClose}>
        <Box sx={ModalStyles}>{componentForm}</Box>
      </Modal>
    </>
  );
}
