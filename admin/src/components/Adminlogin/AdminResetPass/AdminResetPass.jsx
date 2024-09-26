import React, { useState } from 'react';
import { Paper, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; // Ensure axios is installed
import { client } from '../../../Client/Clientaxios';

const AdminResetPass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    passwordCheck: "",
    confirmPasswordCheck: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPass({ ...Pass, [name]: value });
  };

  // Validate passwords
  const validatePasswords = () => {
    let valid = true;
    let errors = {
      passwordCheck: "",
      confirmPasswordCheck: "",
    };
    if (Pass.password.length <= 8) {
      errors.passwordCheck = "Password must be at least 8 characters long";
      valid = false;
    }
    if (Pass.password !== Pass.confirmPassword) {
      errors.confirmPasswordCheck = "Passwords do not match";
      valid = false;
    }
    setError(errors);
    return valid;
  };

  const submitResetPassword = async () => {
    if (!validatePasswords()) return;
    try {
      const response = await client.post("/admin/resetpassword", {
        password: Pass.password,
        confirmPassword: Pass.confirmPassword,
        resetToken: id,
      });

      if (response.status === 200) {
        toast.success('Password has been successfully changed');
        navigate('/Admin');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <div className="col-md-6 offset-md-3">
          <Paper elevation={5} sx={{ padding: "20px" }}>
            <h5>Reset Password</h5>
            <TextField
              helperText={error.passwordCheck}
              error={!!error.passwordCheck}
              name="password"
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              sx={{ width: "100%", marginBottom: "30px" }}
              onChange={handleInputChange}
            />

            <TextField
              helperText={error.confirmPasswordCheck}
              error={!!error.confirmPasswordCheck}
              name="confirmPassword"
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={handleInputChange}
            />
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={submitResetPassword}
                style={{
                  background: "linear-gradient(to bottom, #1ecf73, #b7e56a)",
                  border: "2px solid black",
                  width: "50%",
                  borderRadius: "12px",
                  color: "white",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                Submit
              </button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AdminResetPass;
