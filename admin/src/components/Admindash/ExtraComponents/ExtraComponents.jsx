import React, { useState, useEffect } from "react";
import { client } from "../../../Client/Clientaxios";
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                // value={extraData.image?.name}
                name="image"
                onChange={handleComponent}
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
                // value={extraData.name}
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
                // value={extraData.price}
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
                // value={extraData.description}
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
    </>
  );
};

export default ExtraComponents;
