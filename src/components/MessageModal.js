import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const MessageModal = ({ open, message, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed', // Ensures it stays in the center of the screen
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Centers the modal
          width: 400,
          backgroundColor: 'white', 
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: 24,
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {message}
          </Typography>
          <Button
            variant="contained"
            color="primary" 
            onClick={onClose}
            sx={{
              width: 'auto', // Keeps the width as auto for the smaller button
              padding: '6px 12px', 
              fontSize: '0.875rem', 
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MessageModal;
