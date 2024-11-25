import React from 'react';
import { Box, Typography, Button, Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditItemModal = ({ open, onClose, editingItem, onSave, onInputChange, allItems }) => {

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Edit Item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Item Dropdown */}
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <Box sx={{ flex: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Item
            </Typography>
            <TextField
              fullWidth
              placeholder="Set item"
              value={editingItem?.item || ""}
              onChange={(e) => onInputChange("item", e.target.value)}
              InputProps={{
                sx: {
                  height: "48px",
                  backgroundColor: "#f0f0f0", 
                  "&::placeholder": { color: "#9e9e9e" },
                },
              }}
            />
          </Box>

          {/* Quantity Field */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Quantity
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Set Quantity"
              value={editingItem?.quantity || ""}
              onChange={(e) => onInputChange("quantity", e.target.value)}
              InputProps={{
                sx: {
                  height: "48px",
                  backgroundColor: "#f0f0f0", 
                  "&::placeholder": { color: "#9e9e9e" },
                },
              }}
            />
          </Box>
        </Box>

        {/* Description Field */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Type the description..."
            value={editingItem?.description || ""}
            onChange={(e) => onInputChange("description", e.target.value)}
            InputProps={{
              style: {
                color: editingItem?.description ? "inherit" : "#9e9e9e", 
              },
            }}
            sx={{ bgcolor: "#f0f0f0" }}
          />
        </Box>

        {/* Notes Field */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Notes
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Type a note..."
            value={editingItem?.notes || ""}
            onChange={(e) => onInputChange("notes", e.target.value)}
            InputProps={{
              style: {
                color: editingItem?.notes ? "inherit" : "#9e9e9e", 
              },
            }}
            sx={{ bgcolor: "#f0f0f0" }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={onSave} variant="contained" color="success">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
