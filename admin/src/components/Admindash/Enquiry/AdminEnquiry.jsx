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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    console.log(page);

    const fetchEnquiries = async () => {
      try {
        const response = await client.get(
          `/enquiryUser/getenquiries?page=${page}&limit=${limit}`
        );
        // console.log(response);

        setEnquiries(response.data.pageEnquiry);
        setTotalPage(response.data.totalPages);
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

  const handlePag = (pagenum) => {
    setPage(pagenum);
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
          <nav aria-label="Page navigation example" style={{marginTop:'15px'}}>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button
                  className="page-link"
                  tabIndex="-1"
                  onClick={() => handlePag(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
              </li>

              {totalPage &&
                Array.from({ length: totalPage }).map((_, i) => {
                  return (
                    <div key={i}>
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePag(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    </div>
                  );
                })}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePag(page + 1)}
                  disabled={page === totalPage}
                >
                  Next
                </button>
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
