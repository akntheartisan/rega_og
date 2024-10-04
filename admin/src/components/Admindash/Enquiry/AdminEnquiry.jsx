import React, { useState, useEffect } from 'react';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import './AdminEnquiry.css'; // Ensure you have this CSS file for styling
import { client } from '../../../Client/Clientaxios';

const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Dialog open state
  const [deleteId, setDeleteId] = useState(null); // ID of the enquiry to delete

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await client.get('/enquiryUser/getenquiries');
        console.log('Response from backend:', response.data); // Check the structure here
        setEnquiries(response.data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };
  
    fetchEnquiries();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id); // Set the ID of the enquiry to delete
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend with the enquiry ID as a query parameter
      await client.delete('/enquiryUser/deleteenquiries', { params: { id: deleteId } });
      console.log(deleteId);
      // Update the enquiries state by filtering out the deleted enquiry
      setEnquiries(enquiries.filter(enquiry => enquiry._id !== deleteId));
      // Show success toast
      toast.success('Enquiry deleted successfully!');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      // Show error toast
      toast.error('Error deleting enquiry!');
    }
    setOpenDialog(false); // Close the dialog after deletion
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without deleting
  };

  return (
    <div className="admin-enquiry">
      <h2>Enquiry Details</h2>
      {enquiries.length > 0 ? (
        <table className="enquiry-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry._id}>
                <td>{enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.phone}</td>
                <td>{enquiry.subject}</td>
                <td>{enquiry.message}</td>
                <td>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(enquiry._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No enquiries available</p>
      )}
      <Toaster /> {/* Add Toaster component to display toasts */}
      
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
        Do you want to proceed with deleting this enquiry?  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminEnquiry;
