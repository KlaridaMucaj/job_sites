import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Select, MenuItem, FormControl, Box, Chip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

function CreateJobSitePage({ open, onClose, onSave, message }) {
  const [jobSiteData, setJobSiteData] = useState({ name: '', categories: [], status: '' });
  const [openSelect, setOpenSelect] = useState(false);

  const categoryOptions = [
    { value: 'SidewalkShed', label: 'Sidewalk Shed', color: '#4CAF50' },
    { value: 'Scaffold', label: 'Scaffold', color: '#FFEE58' },
    { value: 'Shoring', label: 'Shoring', color: '#9C27B0' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobSiteData({ ...jobSiteData, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setJobSiteData({
      ...jobSiteData,
      categories: typeof value === 'string' ? value.split(',') : value,
    });
    setOpenSelect(false); // Close the dropdown after selection
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setJobSiteData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((category) => category !== categoryToDelete),
    }));
  };

  const handleSave = () => {
    if (jobSiteData.name && jobSiteData.categories.length > 0 && jobSiteData.status) {
      onSave(jobSiteData);
      setJobSiteData({ name: '', categories: [], status: '' });
      onClose();
    } else {
      // Display the error message if the form is not valid
      alert(message || 'Please fill out all the fields!');
    }
  };

  const isSelected = (value) => jobSiteData.categories.includes(value);

  // Check if the form is valid
  const isFormValid = jobSiteData.name && jobSiteData.categories.length > 0 && jobSiteData.status;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Job Site</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Name
            </Typography>
            <TextField
              name="name"
              placeholder="Type the job site name"
              fullWidth
              value={jobSiteData.name}
              onChange={handleInputChange}
              variant="outlined"
              margin="dense"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {/* Categories Section */}
            <Box sx={{ width: 564 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                Category included
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  name="categories"
                  multiple
                  value={jobSiteData.categories}
                  onChange={handleCategoryChange}
                  open={openSelect}
                  onClose={() => setOpenSelect(false)}
                  onOpen={() => setOpenSelect(true)}
                  displayEmpty
                  renderValue={() => {
                    if (jobSiteData.categories.length === categoryOptions.length) {
                      return <Typography color="gray">All of them selected</Typography>;
                    } else if (jobSiteData.categories.length <= 2) {
                      return <Typography color="gray">Select</Typography>;
                    } else {
                      return <span></span>;
                    }
                  }}
                >
                  {categoryOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => setOpenSelect(false)}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: isSelected(option.value) ? option.color : "transparent",
                        color: isSelected(option.value) ? "#fff" : "inherit",
                        "&:hover": {
                          backgroundColor: option.color,
                          color: "#fff",
                        },
                        "&.Mui-selected": {
                          backgroundColor: option.color,
                          color: "#fff",
                        },
                      }}
                    >
                      {option.label}
                      {isSelected(option.value) && <CheckIcon sx={{ color: "white", marginLeft: "auto" }} />}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {jobSiteData.categories.map((category) => {
                  const categoryOption = categoryOptions.find((opt) => opt.value === category);
                  return (
                    <Chip
                      key={category}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: categoryOption.color,
                              marginRight: 8,
                            }}
                          ></span>
                          {categoryOption.label}
                        </Box>
                      }
                      onDelete={() => handleDeleteCategory(category)}
                      deleteIcon={
                        <Box
                          sx={{
                            width: 15,
                            height: 15,
                            borderRadius: "4px",
                            backgroundColor: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 11 }}>X</Typography>
                        </Box>
                      }
                      sx={{
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        borderRadius: "4px",
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            {/* Status Section */}
            <Box sx={{ width: 270 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                Status
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  name="status"
                  value={jobSiteData.status}
                  onChange={(e) => setJobSiteData({ ...jobSiteData, status: e.target.value })}
                  displayEmpty
                  renderValue={() =>
                    jobSiteData.status ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: jobSiteData.status === "Completed" ? "#4CAF50" : jobSiteData.status === "In Progress" ? "#A5D6A7" : "#FFEE58",
                          }}
                        ></span>
                        <Typography>{jobSiteData.status}</Typography>
                      </Box>
                    ) : (
                      <Typography color="gray">Select Status</Typography>
                    )
                  }
                >
                  {["Completed", "In Progress", "On Hold"].map((status) => (
                    <MenuItem
                      key={status}
                      value={status}
                      sx={{
                        backgroundColor:
                          jobSiteData.status === status
                            ? status === "Completed"
                              ? "#4CAF50"
                              : status === "In Progress"
                              ? "#A5D6A7"
                              : "#FFEE58"
                            : "transparent",
                        color: jobSiteData.status === status ? "#fff" : "inherit",
                        "&:hover": {
                          backgroundColor: status === "Completed" ? "#4CAF50" : status === "In Progress" ? "#A5D6A7" : "#FFEE58",
                          color: "#fff",
                        },
                        "&.Mui-selected": {
                          backgroundColor: status === "Completed" ? "#4CAF50" : status === "In Progress" ? "#A5D6A7" : "#FFEE58",
                          color: "#fff",
                        },
                      }}
                    >
                      <Typography>{status}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={onClose}
          sx={{
            mr: 1,
            display: "flex",
            alignItems: "center",
            opacity: 1,
            textTransform: "none",
          }}
        >
          Cancel Changes
          <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 14, ml: 1 }}>X</Typography>
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          disabled={!isFormValid} // Disable if form is invalid
          sx={{
            display: "flex",
            alignItems: "center",
            opacity: isFormValid ? 1 : 0.5,
            textTransform: "none",
          }}
        >
          Save Changes
          <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 14, ml: 1 }}>✔</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateJobSitePage;
