import React, { useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { client } from "../Client/Client";
import "./profiledesign.css";
import { Paper } from "@mui/material";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";



const ProfileForm = ({}) => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [dataToParent,setDataToParent] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    mobile: '',
    address: '',
    landmark: '',
    district: '',
    state: '',
    pincode: '',
  });

  
  useEffect(() => {
    if (userData) {
      const initialUserContactDetails = {
        name: userData.name || '',
        username: userData.username || '',
        mobile: userData.mobile || '',
        address: userData.address || '',
        landmark: userData.landmark || '',
        district: userData.district || '',
        state: userData.state || '',
        pincode: userData.pincode || '',
      };

    
      setProfileData(initialUserContactDetails);
    }
  }, [userData]); 

  console.log(profileData.name); 

  // useEffect(()=>{
  //   if(setBtnDisable){
  //     handleChildData(setBtnDisable)
  //   }
  // },[setBtnDisable])
  

  const [error, setError] = useState({
    mobile: "",
    address: "",
    landmark: "",
    district: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["mobile", "pincode"].includes(name)) {
      if (/[^0-9]|\s/.test(value)) {
        return false;
      }
    }

    if (["landmark", "district", "state"].includes(name)) {
      if (/[^a-zA-Z\s]/.test(value) || value.charCodeAt(0) === 32) {
        return false;
      }
    }

    if (name === 'address') {
      if (value.charCodeAt(0) === 32) {
        return false;
      }
    }

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const validateFunction = () => {
    let isValid = true;
    let errors = {};

    if (profileData.mobile === "") {
      errors.mobile = "Please fill the detail";
      isValid = false;
    }

    if (profileData.address === "") {
      errors.address = "Please fill the detail";
      isValid = false;
    }

    if (profileData.landmark === "") {
      errors.landmark = "Please fill the detail";
      isValid = false;
    }

    if (profileData.district === "") {
      errors.district = "Please fill the detail";
      isValid = false;
    }

    if (profileData.state === "") {
      errors.state = "Please fill the detail";
      isValid = false;
    }

    if (profileData.pincode === "") {
      errors.pincode = "Please fill the detail";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const profileSubmit = async () => {
    if (validateFunction()) {
      const id = userData._id;
      console.log(id);
      try {
        const response = await client.post("/user/profileupdate", {
          id,
          ...profileData,
        });

        console.log(response.status);

        if (response.status === 200) {
          toast.success("Submitted Successfully");
          navigate('/');
          //setDataToParent(true);
          // setBtnDisable(true);
        }

        if(response.status === 400){
          toast.error("Username has already been registered")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const deleteAccount = async () => {
    const id = userData._id;
    try {
      const deleteAccount = await client.post("/user/deleteAccount", {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(profileData);
  

  return (
    <>
      <div className="container">
        <Paper
          elevation={5}
          sx={{ padding: "25px", marginTop: "15px", marginBottom: "15px" }}
        >
          <div className="row">
            <div className="col-md-12 mt-1 mb-1">
              <h5>Personal Information</h5>
            </div>

            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="model" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="motor" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="battery" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={profileData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                />
                {error.mobile ? (
                  <span style={{ color: "red", fontStyle: "normal" }}>
                    Please fill this detail*
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-12 mt-1 mb-1">
              <h5>Contact Details</h5>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="range" className="form-label">
                  Address
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                />
                {error.address ? (
                  <span style={{ color: "red", fontStyle: "normal" }}>
                    Please fill this detail*
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="brakes" className="form-label">
                  Landmark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="landmark"
                  name="landmark"
                  value={profileData.landmark}
                  onChange={handleChange}
                />
                {error.landmark ? (
                  <span style={{ color: "red", fontStyle: "normal" }}>
                    Please fill this detail*
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="ground" className="form-label">
                  District
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  value={profileData.district}
                  onChange={handleChange}
                />
                {error.district ? (
                  <span style={{ color: "red", fontStyle: "normal" }}>
                    Please fill this detail*
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="payload" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                />
                {error.state ? (
                  <span style={{ color: "red", fontStyle: "normal" }}>
                    Please fill this detail*
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="payload" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                />
                {error.pincode ? (
                  <span style={{ color: "red", fontStyle: "normal" }}>
                    Please fill this detail*
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-md-6">
              <button
                style={{
                  backgroundColor: "#878787",
                  borderColor: "#878787",
                  width: "70px",
                  borderRadius: "12px",
                  color: "white",
                  padding: "5px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                Cancel
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={profileSubmit}
                style={{
                  backgroundColor: "#ff9f00",
                  borderColor: "#ff9f00",
                  width: "70px",
                  borderRadius: "12px",
                  color: "white",
                  padding: "5px",
                  fontSize: "15px",
                  fontWeight: "650",
                }}
              >
                Submit
              </button>
            </div>

            <div className="col-md-12 mt-5">
              <h6>FAQs</h6>
              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "16px", fontWeight: "550" }}>
                  Can I update my name and username?
                </p>
                <p>
                  No, you can't update your name and username.
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "16px", fontWeight: "550" }}>
                  When will my RegaScooter account be updated with the new contact
                  address?
                </p>
                <p>
                  It happens as soon as you submit the details.
                </p>
              </div>
{/* 
              <div style={{ marginBottom: "15px" }}>
                <p style={{ fontSize: "16px", fontWeight: "550" }}>
                  What happens to my existing Flipkart account when I update my
                  email address?
                </p>
                <p>
                  Updating your email address doesn't invalidate your account.
                  Your account remains fully functional. You'll continue seeing
                  your Order history, saved information and personal details.
                </p>
              </div> */}
            </div>

            {/* <div>
              <button
                onClick={deleteAccount}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                <p style={{ color: "red", fontWeight: "550" }}>
                  Delete Account
                </p>
              </button>
            </div> */}
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ProfileForm;
