import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  TextField,
  Stack,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import "./login.css";
import { client } from "../../Client/Clientaxios";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-hot-toast";


const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "white", // Label color
  },
  "& .MuiInputBase-input": {
    color: "white", // Text color
  },
});
const LoginForm = ({ setAdmin, admin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const submit = async () => {
    const credential = { username, password };
    console.log("kansha");
    
    console.log(credential);
    try {
      const response = await client.post("/admin/signin", credential, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Login Successfull");
        getProtected();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const getProtected = async () => {
    try {
      const response = await client.get("/admin/authuser", {
        withCredentials: true,
      });
      console.log(response.data.user);
      const adminDetails = response.data.user;
      if (adminDetails) {
        setAdmin(adminDetails);
        console.log("admin:" + admin);
        navigate("/admin/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const forgotAdminPass=()=>
  {
   navigate('/forgotadminpassword')
  }
  return (
    <>
      <div className="form">
        <Box
          sx={{
            width: "300px",
            minHeight: "300px",
            padding: "20px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
            borderRadius: "25px",
            // border:'1px ridge white'
          }}
        >
          <Stack direction={"column"} spacing={4}>
            <Typography
              sx={{ textAlign: "center", color: "white", fontSize: "20px" }}
            >
              Admin Login
            </Typography>
            <CustomTextField
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />
            <CustomTextField
              label="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              type={checked ? 'text' : 'password'}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PasswordIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction={"column"} sx={{marginTop:'3px'}} spacing={2}>
          <FormControlLabel
              control={
                <Checkbox
                 checked={checked}
                 onChange={(e)=>setChecked(e.target.checked)}
                 size="small"
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: 'white',
                    },
                  }}
                />
              }
              label="Show Password"
              sx={{ color: "white",marginTop:'20px' }}
            />
            <Button size="small" variant="contained" onClick={submit}>
              LogIn
            </Button>
            <button
            onClick={forgotAdminPass}
            className="forgotAdminpass"
            style={{
              margin: "20px 0 0px 0",
              display: "flex",
              justifyContent: "flex-end",
              background: "transparent",
              border: "none",
              color: "white",
            }}
          >
            Forget Password?
          </button>
          </Stack>
   
        </Box>
      </div>
    </>
  );
};

export default LoginForm;
