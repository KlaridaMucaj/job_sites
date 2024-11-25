import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CreateJobSitePage from './CreateJobSitePage';
import MessageModal from './MessageModal'; 

const JobSiteList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [jobSites, setJobSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false); // To control the message modal
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // Default type for message (success, error, info)

  useEffect(() => {
    const savedJobSites = JSON.parse(localStorage.getItem('jobSites')) || [];
    setJobSites(savedJobSites);
  }, []);

  useEffect(() => {
    if (jobSites.length > 0) {
      localStorage.setItem('jobSites', JSON.stringify(jobSites));
    }
  }, [jobSites]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (newJobSite) => {
    const isDuplicate = jobSites.some(site => site.name.toLowerCase() === newJobSite.name.toLowerCase());

    if (isDuplicate) {
      setMessage('A job site with this name already exists!');
      setMessageType('error');
      setMessageModalOpen(true); // Show error modal
      return;
    }

    const newSite = { ...newJobSite, id: jobSites.length + 1 };
    const updatedJobSites = [...jobSites, newSite];
    setJobSites(updatedJobSites);
  };

  const handleJobSiteClick = (jobSiteId) => {
    navigate(`/inventory/${jobSiteId}`);
  };

  const filteredJobSites = jobSites.filter((site) =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false); 
  };
  // localStorage.clear(); // Deletes all items in localStorage

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Job Sites
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 200 }}
          />
          <Button variant="contained" color="success" endIcon={<AddIcon />} onClick={handleOpen}>
            Create
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Jobsite Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobSites.map((site, index) => (
              <TableRow
                key={site.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                <TableCell>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleJobSiteClick(site.id)}
                  >
                    {site.name}
                  </Button>
                </TableCell>
                <TableCell>
                  <Chip
                    label={site.status}
                    color={
                      site.status === 'Completed'
                        ? 'success'
                        : site.status === 'On Hold'
                        ? 'error'
                        : 'warning'
                    }
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                      minWidth: '80px',
                      textAlign: 'center',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateJobSitePage open={open} onClose={handleClose} onSave={handleSave} />

      {/* Message Modal */}
      <MessageModal
        open={messageModalOpen}
        message={message}
        type={messageType}
        onClose={handleCloseMessageModal}
      />
    </Box>
  );
};

export default JobSiteList;
