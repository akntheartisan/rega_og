import { Paper } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { client } from "../Client/Client";
import toast from "react-hot-toast";



const ForgotPassword = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [loader,setLoader] = useState(false);
  const [error,setError] = useState(false);
  console.log(mail);

  const mailPattern = /\S+@\S\.\S+/;

  const submitMail = async () => {
    if(!mail){
      setError(true);
      return false;
    }

    if(!mailPattern.test(mail)){
      setError(true);
      return false;
    }
    
    setLoader(true);
    try {
      const forgotPasswordMail = await client.post("/user/forgotpassword", {
        mail: mail,
      });

      console.log(forgotPasswordMail.response);

      if(forgotPasswordMail.status === 200){
        toast.success('Password Reset Link has been sent to your mail');
        setLoader(false);
        setMail('');
        navigate('/register');
      }
    
    } catch (error) {
      console.log(error.response);
      if(error.response.status === 402){
        toast.error('This Mail is not registered');
        setLoader(false);
        setMail('');
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
              <h5>Forgot Password</h5>
              <p style={{ color: "#969191" }}>
                Enter your registered mail here
              </p>
              <TextField
                type="mail"
                id="outlined-basic"
                label="MailId"
                variant="outlined"
                sx={{ width: "100%" }}
                value={mail}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.charCodeAt(0) !== 32) {
                    setMail(value);
                  }
                }}
              />
              {error ? <p style={{color:'red',fontWeight:'550'}}>Please Enter Your registered mail</p> : ''}
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={!loader ? submitMail : undefined}
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
                  {!loader ? 'submit' : 'Loading ...'}
                </button>
              </div>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#ff9f00",
                  }}
                >
                  <NavigateBeforeIcon />
                  Back to Home
                </button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
