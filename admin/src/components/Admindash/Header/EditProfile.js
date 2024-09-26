import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField, InputAdornment, Box } from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { client } from "../../../Client/Clientaxios";

const EditProfile = ({ openPass, setOpenPass, handleClickOpenEdit, admin }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const handleClose = () => {
    setOpenPass(false);
  };

  const updatePassword = async () => {

    const id = admin._id;
    const updateCredentials = { password, confirm, id };
    try {
      const response = await client.post(
        "/admin/passwordupdate",
        updateCredentials
      );
      if(response.status === 200){
        toast.success('Password Updated Successfully');
        setPassword("");
        setConfirm("");
        setOpenPass(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpenEdit}>
            openEdit alert dialog
          </Button> */}
      <Dialog
        open={openPass}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Password Update"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column" spacing={4} sx={{ marginTop: "5px" }}>
              <TextField
                label="Password"
                name="password"
                // helperText={errors.name}
                // error={!!errors.name}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                name="confirm"
                // helperText={errors.companyname}
                // error={!!errors.companyname}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={updatePassword} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditProfile;
