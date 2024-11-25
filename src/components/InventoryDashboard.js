import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useParams, useNavigate } from "react-router-dom";
import noServiceImage from "./noService.png";
import EditItemModal from "./EditItemModal";

// Function to generate fake data
const generateDummyData = (category) => {
  const dummyData = [];
  for (let i = 1; i <= 5; i++) {
    dummyData.push({
      id: i,
      item: `${category} Item ${i}`,
      quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
      description: `Description for ${category} Item ${i}`,
      notes: `Notes for ${category} Item ${i}`,
    });
  }
  return dummyData;
};

const InventoryDashboard = () => {
  const { jobSiteId } = useParams();
  const navigate = useNavigate();
  const [jobSite, setJobSite] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch job site data from localStorage
  useEffect(() => {
    const savedJobSites = JSON.parse(localStorage.getItem("jobSites")) || [];

    const selectedJobSite = savedJobSites.find((site) => site.id === parseInt(jobSiteId));

    if (selectedJobSite) {
      setJobSite(selectedJobSite);

      // Initialize categoriesData if it's missing
      if (!selectedJobSite.categoriesData) {
        selectedJobSite.categoriesData = {};
      }

      // Load the data for the selected category
      const categoryData = selectedJobSite.categoriesData[selectedCategory] || generateDummyData(selectedCategory);
      setData(categoryData);
      setFilteredData(categoryData);
    } else {
      console.log("Job site not found!");
    }
  }, [jobSiteId, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const categoryData = jobSite.categoriesData[category] || [];
    setData(categoryData);
    setFilteredData(categoryData);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
  
    const filtered = data.filter((item) => {
      return (
        item.item.toLowerCase().includes(searchTerm) || // Search by item name
        item.description.toLowerCase().includes(searchTerm) || // Search by description
        item.notes.toLowerCase().includes(searchTerm) || // Search by notes
        String(item.quantity).toLowerCase().includes(searchTerm) // Search by quantity (convert to string)
      );
    });
  
    setFilteredData(filtered);
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setData([]);
    setFilteredData([]);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCellDoubleClick = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = () => {
    // Update the data with the edited item
    const updatedData = data.map((item) => (item.id === editingItem.id ? editingItem : item));
    setData(updatedData);
    setFilteredData(updatedData);

    // Save updated data to localStorage (for persistence)
    const savedJobSites = JSON.parse(localStorage.getItem("jobSites")) || [];
    const updatedJobSites = savedJobSites.map(site => {
      if (site.id === parseInt(jobSiteId)) {
        return {
          ...site,
          categoriesData: {
            ...site.categoriesData,
            [selectedCategory]: updatedData, // Update the selected category's data
          },
        };
      }
      return site;
    });

    // Save updated job sites back to localStorage
    localStorage.setItem("jobSites", JSON.stringify(updatedJobSites));

    handleModalClose();
  };

  const handleInputChange = (field, value) => {
    setEditingItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar with Categories */}
      <Box
        sx={{
          width: "20%",
          p: 2,
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {jobSite?.name}
          </Typography>

          {/* Display categories dynamically */}
          {jobSite?.categories &&
            jobSite.categories.map((category, index) => (
              <Box
                key={index}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  p: 0.7,
                  mb: 0.5,
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: selectedCategory === category ? "#4CAF50" : "#f5f5f5",
                  color: selectedCategory === category ? "#fff" : "#000",
                  border: "1px solid transparent",
                  "&:hover": {
                    backgroundColor: selectedCategory === category ? "#388E3C" : "#eaeaea",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: selectedCategory === category ? "bold" : "normal",
                  }}
                >
                  {category}
                </Typography>
                {selectedCategory === category && <CheckIcon sx={{ color: "#fff" }} />}
              </Box>
            ))}
        </Box>
        <Button variant="contained" endIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ alignSelf: "center", mt: 2 }}>
          Go Back
        </Button>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedCategory && data.length > 0 ? (
          <>
            {/* Header with Search Bar */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">{selectedCategory}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <TextField
                placeholder="Search an item"
                onChange={handleSearch}
                size="small"
                sx={{ width: "40%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton onClick={handleClearCategory}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Data Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow
                      key={item.id}
                      hover
                      onDoubleClick={() => handleCellDoubleClick(item)}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }} 
          >
            <img src={noServiceImage} alt="No Service Selected" style={{ maxWidth: "300px", width: "100%", marginBottom: "16px" }} />
            <Typography variant="h6" fontWeight="bold" align="center">
              No Service Selected
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginTop: "8px" }}>
              Please select a service on your left to proceed.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Edit Item Modal */}
      <EditItemModal open={modalOpen} editingItem={editingItem} onSave={handleSave} onClose={handleModalClose} onInputChange={handleInputChange} />
    </Box>
  );
};

export default InventoryDashboard;