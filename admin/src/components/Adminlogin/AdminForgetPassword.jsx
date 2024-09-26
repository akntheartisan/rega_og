import { Paper } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { client } from "../../Client/Clientaxios";

const AdminForgetPassword = () => {
 
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  console.log(mail);

  const submitMail = async () => {
    try{
      const forgotAdminmail=await client.post("/admin/forgotpassword",{
        mail:mail,
      });
      console.log(forgotAdminmail.response);
      if(forgotAdminmail.status===200)
      {
        toast.success()
        toast.success('Password Reset Link has been sent to your mail');
        setMail('');
      }
      
    }
    catch(err){
        if(err.response.status===402)
        {
          toast.error('This Mail is not registered');
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
                id="outlined-basic"
                label="MailId"
                variant="outlined"
                sx={{ width: "100%" }}
                value={mail}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
              />
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
  onClick={submitMail}
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
                    color: " #1ecf73",
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

}

export default AdminForgetPassword