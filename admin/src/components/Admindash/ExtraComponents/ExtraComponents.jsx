import React, { useState, useEffect,useRef } from "react";
import { client } from "../../../Client/Clientaxios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import ExtraComponentManage from "./ExtraComponentManage";
// import { toast } from "react-hot-toast";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

const initialState = {
  image: "",
  name: "",
  price: "",
  description: "",
};

const ExtraComponents = () => {
  const [extraData, setExtraData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [component, setComponent] = useState([]);

  const imageRef = useRef()

  console.log(extraData);
  

  const handleComponent = (e) => {
    const { name, value, files } = e.target;
    console.log(e.target);

    if (name === "image") {
      if (files[0].type !== "image/png" && files[0].type !== "image/jpeg") {
        toast.error("please select valid file");
        return;
      }

      setExtraData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setExtraData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submit = async () => {
    setLoading(true);
    const { image, name, price, description } = extraData;

    if (!image || !name || !price || !description) {
      toast.error("Please fill all the inputs");
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    try {
      const componentCreate = await client.post(
        "/component/postComponent",
        formData
      );
      console.log(componentCreate);
      if (componentCreate.status === 200) {
        imageRef.current.value = ""
        setExtraData(initialState);
        setLoading(false);
        fetchComponent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComponent = async () => {
    try {
      const response = await client.get("/component/getComponent");
      console.log(response.data.readResponse);

      if (response.status === 200) {
        setComponent(response.data.readResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComponent();
  }, []);

  return (
    <>
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
            zIndex: 9999, // Ensures spinner is on top of other elements
          }}
        >
          <CircularProgress size={100} color="primary" />
        </Box>
      )}
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "10px auto",
          padding: "20px",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
        // onSubmit={submit}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", margin: "0px 0px 13px 0px" }}
        >
          Components Entry Form
        </Typography>

        <div className="row">
          <div className="col-md-12 mt-4">
            <div class="form-group">
              <label>Component Image</label>
              <input
                type="file"
                class="form-control"
                value={extraData.image?.File?.name}
                name="image"
                onChange={handleComponent}
                ref={imageRef}
              />
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter the name"
                name="name"
                value={extraData.name}
                onChange={handleComponent}
              />
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div class="form-group">
              <label>Price</label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter the price"
                value={extraData.price}
                name="price"
                onChange={handleComponent}
              />
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div class="form-group">
              <label>Description</label>
              <textarea
                class="form-control"
                name="description"
                value={extraData.description}
                onChange={handleComponent}
              />
            </div>
          </div>
        </div>

        <div className="col-md-12 mt-4 d-flex justify-content-center">
          <button type="button" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-warning">Cancel</button>
        </div>
      </Box>

      <ExtraComponentManage
        component={component}
        fetchComponent={fetchComponent}
      />
    </>
  );
};

export default ExtraComponents;
