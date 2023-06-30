import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalStyles from './modalStyle';

export default function ModalForm({ componentForm, modalState, handleClose }) {
  return (
    <>
      <Modal open={modalState} onClose={handleClose}>
        <Box sx={ModalStyles}>{componentForm}</Box>
      </Modal>
    </>
  );
}
