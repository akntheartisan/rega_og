import React, { useState } from "react";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../Client/Client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [credential, setCredential] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    passwordCheck: "",
    confirmPasswordCheck: "",
  });

  const resetPassword = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    if (name === "password") {
      const UpperCase = /[A-Z]/.test(value);
      const LowerCase = /[a-z]/.test(value);
      const Digit = /\d/.test(value);
      const SpecialChar = /[!@#$%^&*()_-]/.test(value);
      const passwordLength = value.length;

      if (
        !UpperCase ||
        !LowerCase ||
        !Digit ||
        !SpecialChar ||
        passwordLength < 8
      ) {
        setError((prevError) => ({
          ...prevError,
          passwordCheck: "Password must contain 8 characters",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          passwordCheck: "",
        }));
      }
    }

    if (name === "confirmpassword") {
      if (value !== credential.password) {
        setError((prevError) => ({
          ...prevError,
          confirmPasswordCheck: "Passwords must match",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          confirmPasswordCheck: "",
        }));
      }
    }

    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const submitResetPassword = async () => {
    if (credential.password === "" && credential.confirmPassword === "") {
      toast.error("please fill all the field");
    }
      const {password,confirmPassword} = credential;

      try {
        const passwordReset = await client.post("/user/resetPassword", {
          password,
          confirmPassword,
          resetToken: id,
        });

        if(passwordReset.status === 200){
          toast.success('Password has been successfully changed');
          navigate('/register');

        }
      } catch (error) {
        console.log(error);
      }
  
  };
  return (
    <>
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
                onChange={resetPassword}
              />

              <TextField
                helperText={error.confirmPasswordCheck}
                error={!!error.confirmPasswordCheck}
                name="confirmpassword"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={resetPassword}
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
                    backgroundColor: "#ff9f00",
                    borderColor: "#ff9f00",
                    width: "50%",
                    borderRadius: "12px",
                    color: "white",
                    padding: "10px",
                    fontSize: "15px",
                    fontWeight: "650",
                  }}
                >
                  submit
                </button>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
