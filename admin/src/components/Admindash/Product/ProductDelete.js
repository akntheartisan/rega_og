import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { client } from "../../../Client/Clientaxios";

export default function ProductDelete({ deleteOpen, setDeleteOpen, product,deleteSubmit }) {
  const [deletedProduct, setDeletedProduct] = React.useState("");

  const handleClose = () => {
    setDeleteOpen(false);
  };

  React.useEffect(() => {
    setDeletedProduct(product);
  }, [product]);


  return (
    <React.Fragment>
      <Dialog
        open={deleteOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Product Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Are you sure, you want to delete {deletedProduct.model}?
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="warning">
            Cancel
          </Button>
          <Button
            onClick={() => deleteSubmit(deletedProduct._id)}
            autoFocus
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
