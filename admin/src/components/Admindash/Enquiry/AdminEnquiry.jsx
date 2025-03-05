import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import "./AdminEnquiry.css";
import { client } from "../../../Client/Clientaxios";

const AdminEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page,setPage] = useState()

  useEffect(() => {
    console.log('i am again and again refresh');
    console.log(page);
    
    
    const fetchEnquiries = async () => {
      try {
        const response = await client.get("/enquiryUser/getenquiries");

        setEnquiries(response.data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, [page]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await client.delete("/enquiryUser/deleteenquiries", {
        params: { id: deleteId },
      });
      console.log(deleteId);

      setEnquiries(enquiries.filter((enquiry) => enquiry._id !== deleteId));

      toast.success("Enquiry deleted successfully!");
    } catch (error) {
      console.error("Error deleting enquiry:", error);

      toast.error("Error deleting enquiry!");
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePag = (e) => {
    const target = e.target.textContent.trim().toLowerCase();
    setPage(target)
    
  };

  return (
    <div className="admin-enquiry">
      <h2>Enquiry Details</h2>
      {enquiries.length > 0 ? (
        <>
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
              {enquiries.map((enquiry) => (
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
          <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-end" onClick={handlePag}>
              <li className="page-item disabled">
                <button className="page-link" tabIndex="-1">
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <p>No enquiries available</p>
      )}
      <Toaster /> {/* Add Toaster component to display toasts */}
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
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
