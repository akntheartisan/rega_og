import React, { useState, useContext } from "react";
import "./Signin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Stack, TextField, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { client } from "../Client/Client";
import { UserContext } from "../../App";

const Signin = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [terms, setTerms] = useState(false);
  const [termsShow, setTermsShow] = useState(true);

  async function verify() {
    if (!terms) {
      setTermsShow(false);
      return false;
    }

    const credential = { username, password };
    try {
      const response = await client.post("/user/signin", credential, {
        withCredentials: true,
      });
      console.log(response.status);

      if (response.status === 200) {
        toast.success("Logged In");
        setUserName("");
        setPassword("");
        getUserData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  }

  const getUserData = async () => {
    try {
      const response = await client.get("/user/protect", {
        withCredentials: true,
      });
      const user = response.data.user;
      if (response.status === 200) {
        setUserData(user);
        navigate("/");
        localStorage.setItem("authToken", "rega");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = () => {
    navigate("/forgetPasswordPage");
  };

  const credentialEnter = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      if (value.charCodeAt(0) === 32) {
        return false;
      }
      setUserName(value);
    }

    if (name === "password") {
      if (value.charCodeAt(0) === 32) {
        return false;
      }
      setPassword(value);
    }
  };

  const eyeOpener = (boo) => {
    console.log("eyeopener");
    setChecked(boo);
  };

  return (
    <div>
      <>
        <Stack direction="column" spacing={4} sx={{ color: "white" }}>
          <TextField
            label="Username"
            name="username"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            helperText={errors.username}
            error={!!errors.username}
            value={username}
            onChange={credentialEnter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />

          <TextField
            label="Password"
            name="password"
            size="small"
            type={checked ? "text" : "password"}
            sx={{
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
            }}
            value={password}
            onChange={credentialEnter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {!checked ? (
                    <VisibilityOffIcon
                      sx={{ color: "white", cursor: "pointer" }}
                      onClick={() => eyeOpener(true)}
                    />
                  ) : (
                    <VisibilityIcon
                      sx={{ color: "white", cursor: "pointer" }}
                      onClick={() => eyeOpener(false)}
                    />
                  )}
                </InputAdornment>
              ),
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
        </Stack>

        <div style={{ marginTop: "20px" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                size="small"
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            sx={{ color: "white" }}
          />
          <NavLink>Terms & Conditions</NavLink>
        </div>

        <Stack>
          <button
            type="button"
            class="btn"
            onClick={verify}
            style={{ color: "white", backgroundColor: "#f28123" }}
          >
            LogIn
          </button>
          {termsShow ? (
            ""
          ) : (
            <p style={{ color: "#f28123",marginTop:'5px',fontWeight:'600' }}>
              Please Check the terms & conditions
            </p>
          )}
        </Stack>
        <Stack>
          <button
            onClick={forgotPassword}
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
      </>
    </div>
  );
};

export default Signin;
