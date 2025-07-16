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
import ProductTable from "./ProductTable";
import { toast } from "react-hot-toast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const initial = {
  model: "",
  motor: "",
  battery: "",
  range: "",
  tyresize: "",
  brakes: "",
  ground: "",
  payload: "",
  charging: "",
  frame: "",
  price: "",
};

const Product = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("768px"));
  const [product, setProduct] = useState(initial);
  const [errors, setErrors] = useState({});
  const [primary, setPrimary] = useState("");

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };
  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "price" && isNaN(value)) {
      errorMessage = "Price must be a number.";
    } else if (/\s/.test(value) && name !== "price") {
      errorMessage = "Spaces are not allowed.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
  useEffect(() => {
    getPrimayProduct();
  }, []);

  const getPrimayProduct = async () => {
    try {
      const response = await client.get("/project/getPrimary");
      console.log(response);
      const PrimaryProduct = response.data.data;
      setPrimary(PrimaryProduct);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product);

  const validateForm = () => {
    let newErrors = {};

    const fields = [
      "model",
      "motor",
      "battery",
      "range",
      "tyresize",
      "brakes",
      "ground",
      "payload",
      "charging",
      "frame",
      "price",
    ];

    fields.forEach((field) => {
      if (!product[field]) {
        newErrors[field] = `Please fill the ${field}`;
      } else if (field === "price" && isNaN(product[field])) {
        newErrors[field] = "Price must be a number.";
      } else if (/\s/.test(product[field]) && field !== "price") {
        newErrors[field] = "Spaces are not allowed.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    try {
      const response = await client.post("/project/productadd", product);
      if (response.status === 200) {
        toast.success("New Product Added Successfully");
        setProduct(initial);
      }
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
        onSubmit={submit}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", margin: "0px 0px 13px 0px" }}
        >
          Product Entry Form
        </Typography>
        <Stack spacing={2}>
          <FormControl sx={{ m: 4, minWidth: 480 }} size="small">
            <InputLabel id="demo-select-small-label">Select Model</InputLabel>
            <Select
              // fullWidth
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={product.model}
              error={!!errors.model}
              label="Select Model"
              name="model"
              helperText={errors.model}
              onChange={handleChange}
            >
              {primary &&
                primary.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Battery"
              variant="outlined"
              size="small"
              value={product.battery}
              onChange={handleChange}
              name="battery"
              helperText={errors.battery}
              error={!!errors.battery}
            />
            <TextField
              fullWidth
              label="Mileage"
              variant="outlined"
              size="small"
              value={product.range}
              onChange={handleChange}
              name="range"
              helperText={errors.range}
              error={!!errors.range}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              size="small"
              value={product.price}
              error={!!errors.price}
              onChange={handleChange}
              name="price"
              helperText={errors.price}
            />

            <TextField
              fullWidth
              label="Charging Time"
              variant="outlined"
              size="small"
              value={product.charging}
              onChange={handleChange}
              name="charging"
              helperText={errors.charging}
              error={!!errors.charging}
            />
          </Stack>

          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Motor"
              variant="outlined"
              size="small"
              value={product.motor}
              error={!!errors.motor}
              onChange={handleChange}
              name="motor"
              helperText={errors.motor}
            />

            <TextField
              fullWidth
              label="Payload"
              variant="outlined"
              size="small"
              value={product.payload}
              onChange={handleChange}
              name="payload"
              helperText={errors.payload}
              error={!!errors.payload}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Tyre Size and Type"
              variant="outlined"
              size="small"
              value={product.tyresize}
              onChange={handleChange}
              name="tyresize"
              helperText={errors.tyresize}
              error={!!errors.tyresize}
            />
            <TextField
              fullWidth
              label="Brakes"
              variant="outlined"
              size="small"
              value={product.brakes}
              onChange={handleChange}
              name="brakes"
              helperText={errors.brakes}
              error={!!errors.brakes}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Ground Clearance"
              variant="outlined"
              size="small"
              value={product.ground}
              onChange={handleChange}
              name="ground"
              helperText={errors.ground}
              error={!!errors.ground}
            />
            <TextField
              fullWidth
              label="Frame"
              variant="outlined"
              size="small"
              value={product.frame}
              onChange={handleChange}
              name="frame"
              helperText={errors.frame}
              error={!!errors.frame}
            />
          </Stack>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Area Availability"
              variant="outlined"
              size="small"
              value={product.availability}
              onChange={handleChange}
              name="availability"
              helperText={errors.availability}
              error={!!errors.availability}
            />
          </Stack>

          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="A"
              variant="outlined"
              size="small"
              value={product.availability}
              onChange={handleChange}
              name="availability"
              helperText={errors.availability}
              error={!!errors.availability}
            />
          </Stack>

          <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <Button variant="contained" color="warning">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ marginTop: "35px", marginBottom: "35px", padding: "15px" }}>
        <ProductTable product={product} setProduct={setProduct} />
      </Box>
    </>
  );
};

export default Product;
