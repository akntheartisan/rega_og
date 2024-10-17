import React, { useState,useEffect } from "react";
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

  const [isTokenValid, setIsTokenValid] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    let isMounted = true; 
  
    const fetchUserData = async () => {
      try {
        const response = await client.get(`/user/validateResetToken/${id}`);
        
        if (response.status === 200 && isMounted) { 
          setIsTokenValid(true); 
          setUserData(response.data.user);  
        }
      } catch (error) {
        if (isMounted) { 
          console.log("Token validation error:", error);
          setIsTokenValid(false);  
          toast.error("Invalid link. Please request a new one.");
          navigate("*");
        }
      }
    };
  
    fetchUserData();
  
    return () => {
      isMounted = false; 
    };
  }, [id,navigate]); 
  


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
          passwordCheck: (
            <>
              Password Must Contain:
              <br />
              One Capital Letter
              <br />
              One Small Letter
              <br />
              One Special character
              <br />
              One Number
              <br />
              Minimum 8 characters
              <br />
            </>
          ),
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
      return false;
    } else if (
      error.passwordCheck !== "" ||
      error.confirmPasswordCheck !== ""
    ) {
      return false;
    } else {
      const { password, confirmPassword } = credential;

      try {
        const passwordReset = await client.post("/user/resetPassword", {
          password,
          confirmPassword,
          resetToken: id,
        });

        if (passwordReset.status === 200) {
          toast.success("Password has been successfully changed");
          navigate("/register");
        }
      } catch (error) {
        console.log(error.response.status);
        if(error.response.status === 404){
          toast.error('link expired. Please request a new one.')
        }
      }
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