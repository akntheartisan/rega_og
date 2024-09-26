import React, { useState } from "react";
import { client } from "../../../Client/Clientaxios";
import { toast } from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'; // Ensure Paper is imported

const PrimaryProduct = () => {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState("");
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const modelRegexAlphabetic = /^[a-zA-Z]+$/; 
  const modelRegexLength = /^.{3,30}$/; 
  const maxFileSize = 1 * 1024 * 1024; 

  const validateModel = (value) => {
    if (!modelRegexLength.test(value)) {
      setModelError(" must be between 3 to 30 characters.");
    } else if (!modelRegexAlphabetic.test(value)) {
      setModelError("Product name must be alphabetic and can't include spaces.");
    } else {
      setModelError(""); 
    }
  };

  const handleModelChange = (e) => {
    const value = e.target.value;
    setModel(value);
    validateModel(value);
  };

  const validateImage = (file) => {
    if (!file) {
      setImageError("Please select an image.");
    } else if (file.size > maxFileSize) {
      setImageError("Image size must be less than 1 MB.");
    } else {
      setImageError(""); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        setImage(URL.createObjectURL(file));
        setImageError("");
      } else {
        setImage(null);
        setImageError("Only PNG and JPEG formats are allowed.");
      }
    }
    setImage(file);
    validateImage(file);
  };

  const submit = async () => {
    // Prevent submission if there are errors
    if (modelError !== "" || imageError !== "") {
      return;
    }

    // Set loading to true when starting the request
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("model", model);

    try {
      const response = await client.post("/project/primary", formData);
      setImage(null);
      setModel("");
      if (response.status === 200) {
        toast.success("Model created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create model");
    } finally {
      // Set loading to false once the request is complete
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <Paper elevation={3} className="p-4"> {/* Wrap content in Paper */}
          <div className="row">
            <div className="col-md-4 offset-md-4 mt-4">
              <div>
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  value={model}
                  name="model"
                  onChange={handleModelChange}
                  className="form-control"
                />
                {modelError && (
                  <div className="text-danger">{modelError}</div>
                )}
              </div>
            </div>

            <div className="col-md-4 offset-md-4 mt-4">
              <div>
                <label className="form-label">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="form-control"
                  accept="image/*"
                />
                {imageError && (
                  <div className="text-danger">{imageError}</div>
                )}
              </div>
            </div>

            <div className="col-md-4 offset-md-4 mt-4">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button className="btn btn-light">Cancel</button>
                <button className="btn btn-success" onClick={submit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Paper>
      </div>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,  // Ensures spinner is on top of other elements
          }}
        >
          <CircularProgress size={100} color="primary" />
        </Box>
      )}
    </>
  );
};

export default PrimaryProduct;
