import React, { useState, useEffect } from "react";
import { client } from "../../../Client/Clientaxios";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper"; // Ensure Paper is imported
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Typography,
} from "@mui/material";

const PrimaryProduct = () => {
  const [image, setImage] = useState(null);
  const [currentimage, setCurrentimage] = useState(null);
  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState("");
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const modelRegexAlphabetic = /^[a-zA-Z]+$/;
  const modelRegexLength = /^.{3,30}$/;
  const maxFileSize = 1 * 1024 * 1024;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await client.get("/project/getproduct");
      setProducts(response.data.data);
      console.log(products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  const validateModel = (value) => {
    if (!modelRegexLength.test(value)) {
      setModelError(" must be between 3 to 30 characters.");
    } else if (!modelRegexAlphabetic.test(value)) {
      setModelError(
        "Product name must be alphabetic and can't include spaces."
      );
    } else {
      setModelError("");
    }
  };

  const handleModelChange = (e) => {
    const value = e.target.value;
    setModel(value);
    validateModel(value);
  };

  const handleEdit = (product) => {
    console.log("kansha");

    setModel(product.model);
    setImage(product.image.url);
    setCurrentimage(product.image.url);
    console.log("Kansha");
    console.log(Image);

    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    //kansha
    if (modelError || imageError) return; // Prevent update if there are errors

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("model", model);
    formData.append("_id", editingProduct._id);

    setLoading(true);

    try {
      const response = await client.put(
        `/project/updateprimary/${editingProduct._id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        fetchProducts();
      } else {
        toast.error("Failed to update product: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Failed to update product: " + error.message);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setImage(null);
    setModel("");
  };

  const handleDelete = async (id) => {
    try {
      const response = await client.delete(`/project/deleteprimary/${id}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
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
    const file = Array.from(e.target.files);
    // console.log(file);

    setImageError("");

    const validImage = file.filter((eachImage) => {
      return (
        (eachImage.type === "image/png" || eachImage.type === "image/jpeg") &&
        eachImage.size <= maxFileSize
      );
    });

    if (validImage.length > 0) {
      setImage(validImage);
    } else {
      setImageError("Please select valid images (PNG/JPEG, max 1MB).");
    }
  };

  const submit = async () => {
    if (modelError || imageError) return;

    setLoading(true);

    console.log(image);

    const formData = new FormData();
    image.forEach((eachImg, index) => {
      formData.append("image", eachImg);
    });
    formData.append("model", model);

    try {
      const response = editingProduct
        ? await client.put(
            `/project/updateprimary/${editingProduct._id}`,
            formData
          )
        : await client.post("/project/primary", formData);

      if (response.status === 200) {
        toast.success(
          editingProduct
            ? "Product updated successfully"
            : "Model created successfully"
        );
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        editingProduct ? "Failed to update product" : "Failed to create model"
      );
    } finally {
      setLoading(false);
      setImage(null);
      setModel("");
      setEditingProduct(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Paper elevation={3} className="p-4">
              <div className="row">
                <div className="col-md-8 offset-md-2 mt-4">
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

                <div className="col-md-8 offset-md-2 mt-4">
                  <div>
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="form-control"
                      accept="image/*"
                      multiple
                    />
                    {imageError && (
                      <div className="text-danger">{imageError}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-4 offset-md-4 mt-4">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        setImage(null);
                        setModel("");
                        setEditingProduct(null);
                      }}
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-success"
                      onClick={submit}
                      disabled={loading}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
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
            zIndex: 9999, // Ensures spinner is on top of other elements
          }}
        >
          <CircularProgress size={100} color="primary" />
        </Box>
      )}

      {/* <div className="container mt-5">
        <h3>Products List</h3>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {product.model}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <img
                      src={product.image.url}
                      alt={product.model}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Tooltip title="Edit">
                      <Button
                        onClick={() => handleEdit(product)}
                        variant="text"
                        color="primary"
                        disableElevation
                        style={{ minWidth: 0 }}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        onClick={() => handleDelete(product._id)}
                        variant="text"
                        color="secondary"
                        disableElevation
                        style={{ minWidth: 0 }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}

      {/* Modal for Editing */}
      <Modal
        open={modalOpen}
        // onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <div className="mt-2">
            <label
              className="form-label"
              style={{ color: "black", fontWeight: "600" }}
            >
              New Product Name
            </label>
            <input
              type="text"
              value={model}
              onChange={handleModelChange}
              className="form-control"
            />
            {modelError && <div className="text-danger">{modelError}</div>}
          </div>

          {image && (
            <div className="mt-2">
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
                Current Image
              </label>
              <div
                className="iamge-container-1"
                style={{ width: "60px", height: "60px" }}
              >
                <img
                  src={currentimage}
                  alt="Current"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              </div>
            </div>
          )}
          <div className="mt-2">
            <label
              className="form-label"
              style={{ color: "black", fontWeight: "600" }}
            >
              New Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control"
              accept="image/*"
            />
            {imageError && <div className="text-danger">{imageError}</div>}
          </div>
          <div
            className="mt-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleUpdate} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PrimaryProduct;
