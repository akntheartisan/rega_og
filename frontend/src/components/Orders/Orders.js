import {
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  Rating,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { client } from "../Client/Client";
import CheckoutHeader from "../Checkout/CheckoutHeader";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserContext } from "../../App";
import "./order.css";
import EmptyCart from "../Cart/CartDetails/EmptyCart";
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";
import Footer from "../Footer/Footer";
import { Button as AntButton, message, Popconfirm } from "antd";

const initialCheckBox = {
  delivered: false,
  notdelivered: false,
  cancelled: false,
};

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBattery, setSelectedBattery] = useState("");
  const [ordered, setOrdered] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [orderCheckBox, setOrderCheckBox] = useState(initialCheckBox);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { id } = location.state || "";
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const smallScreen = useMediaQuery("(max-width:902px)");

  useEffect(() => {
    getOrderedProducts();
  }, []);

  useEffect(() => {
    filterOrder();
  }, [orderCheckBox]);

  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id]);

  const getOrderedProducts = async () => {
    try {
      const response = await client.get("/user/getOrderedProducts", {
        params: { id },
      });
      setOrdered(response.data.purchased);
      setFiltered(response.data.purchased);
      console.log("ordered data", response.data.purchased);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setOrderCheckBox((prev) => ({ ...prev, [name]: checked }));
  };

  const filterOrder = () => {
    let filteredOrder = [...ordered];

    if (orderCheckBox.delivered) {
      filteredOrder = filteredOrder.map((order) => ({
        ...order,
        cartData: order.cartData.filter((data) =>
          data.deliverystatus.includes("Delivered")
        ),
      }));
    }

    if (orderCheckBox.notdelivered) {
      filteredOrder = filteredOrder.map((order) => ({
        ...order,
        cartData: order.cartData.filter((data) =>
          data.deliverystatus.includes("Not Delivered")
        ),
      }));
    }

    if (orderCheckBox.cancelled) {
      filteredOrder = filteredOrder.map((order) => ({
        ...order,
        cartData: order.cartData.filter((data) =>
          data.deliverystatus.includes("cancelled")
        ),
      }));
    }

    setFiltered(filteredOrder);
  };

  const cancelProduct = async (purchased_id, cartId, paidAmount, paymentId) => {
    try {
      await client.post("/user/cancelProducts", {
        id: userData._id,
        purchased_id,
        cartId,
        paidAmount,
        paymentId,
      });
      getOrderedProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const pdfDownload = async (purchased_id, cartId) => {
    try {
      const response = await client.get("/pdfdown/downloads", {
        params: { id: userData._id, purchased_id, cartId },
        responseType: "blob",
      });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleOpen = (model, battery) => {
    setSelectedModel(model);
    setSelectedBattery(battery);
    setOpen(true);
  };

  const Ratesubmission = async () => {
    try {
      const response = await client.post("/rating/submit-rating", {
        model: selectedModel,
        battery: selectedBattery,
        rating,
      });

      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  console.log("order:", filtered);

  return (
    <>
      <CheckoutHeader />
      {ordered.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="container-fluid mt-5">
          <div className="row" style={{ display: "flex" }}>
            <div className="col-md-3 mt-3">
              <Paper elevation={3} sx={{ padding: "5px" }}>
                <h5>Filters</h5>
                <hr />
                <h6>Ordered Status</h6>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderCheckBox.delivered}
                        onChange={handleCheck}
                        name="delivered"
                        disabled={
                          orderCheckBox.notdelivered || orderCheckBox.cancelled
                        }
                      />
                    }
                    label="Delivered"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderCheckBox.notdelivered}
                        onChange={handleCheck}
                        name="notdelivered"
                        disabled={
                          orderCheckBox.delivered || orderCheckBox.cancelled
                        }
                      />
                    }
                    label="Not Delivered"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={orderCheckBox.cancelled}
                        onChange={handleCheck}
                        name="cancelled"
                        disabled={
                          orderCheckBox.delivered || orderCheckBox.notdelivered
                        }
                      />
                    }
                    label="Cancelled"
                  />
                </FormGroup>
              </Paper>
            </div>
            <div className="col-md-9">
              {filtered.map((eachOrder) => (
                <div key={eachOrder._id}>
                  {eachOrder.cartData.map((order) => (
                    <Paper
                      key={order.cartId}
                      elevation={4}
                      sx={{
                        marginTop: "10px",
                        padding: "20px",
                      }}
                    >
                      <p style={{textAlign:'left',opacity:0.7}}>Order Id&nbsp;&nbsp; #{eachOrder.cartData[0].cartId}</p>
                      <div className="row">
                        <div className="col-md-3 col-6 d-flex justify-content-center">
                          <img
                            src={order.image}
                            alt="Order"
                            className="order_image"
                          />
                        </div>
                        <div className="col-md-3 col-6">
                          <p>
                            {order.model} {order.subModelDetails.battery}
                          </p>
                          <p>{order.subModelDetails.range} km/hr</p>
                        </div>
                        <div
                          className="col-md-3 col-6"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <p>&#8377;{order.subModelDetails.price}</p>
                          <p>Items : {order.quantity}</p>
                        </div>
                        <div className="col-md-3 col-6">
                          {order.deliverystatus === "Delivered" ? (
                            <>
                              <div
                                style={{
                                  height: "10px",
                                  width: "10px",
                                  backgroundColor: "green",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              ></div>{" "}
                              Delivered
                              <br />
                              <Button
                                onClick={() =>
                                  pdfDownload(eachOrder._id, order.cartId)
                                }
                                variant="contained"
                                startIcon={<PictureAsPdfIcon />}
                                className="order_cancel"
                              >
                                Invoice
                              </Button>
                              <div>
                                <Button
                                  variant="text"
                                  color="primary"
                                  onClick={() =>
                                    handleOpen(
                                      order.model,
                                      order.subModelDetails.battery
                                    )
                                  }
                                >
                                  Rate this Product
                                </Button>
                              </div>
                            </>
                          ) : order.deliverystatus === "Not Delivered" ? (
                            <>
                              <div
                                style={{
                                  height: "10px",
                                  width: "10px",
                                  backgroundColor: "#f28123",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              ></div>{" "}
                              Not Delivered
                              <br />
                              <Popconfirm
                                title="Delete the task"
                                description="Are you sure to cancel the product"
                                onConfirm={() =>
                                  cancelProduct(
                                    eachOrder._id,
                                    order.cartId,
                                    eachOrder.paidAmount,
                                    eachOrder.payment_id
                                  )
                                }
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <AntButton type="primary" danger>Cancel</AntButton>
                              </Popconfirm>
                              {/* <Button
                                onClick={() =>
                                  cancelProduct(
                                    eachOrder._id,
                                    order.cartId,
                                    eachOrder.paidAmount,
                                    eachOrder.payment_id
                                  )
                                }
                                color="error"
                                variant="contained"
                                startIcon={<CancelIcon />}
                                className="order_cancel"
                              >
                                Cancel
                              </Button> */}
                            </>
                          ) : order.deliverystatus === "cancelled" ? (
                            <>
                              <div
                                style={{
                                  height: "10px",
                                  width: "10px",
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              ></div>{" "}
                              Cancelled
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Paper>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="rating-modal-title"
        aria-describedby="rating-modal-description"
      >
        <Box
          sx={{
            padding: 3,
            backgroundColor: "white",
            borderRadius: "8px",
            width: "300px",
            margin: "auto",
            marginTop: "10%",
          }}
        >
          <Typography id="rating-modal-title" variant="h6" component="h2">
            Rate Your Product
          </Typography>
          <Typography id="rating-modal-description" sx={{ mt: 2 }}>
            Model: {selectedModel} - Battery: {selectedBattery}
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <br />
          <Button
            onClick={Ratesubmission}
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Submit Rating
          </Button>
        </Box>
      </Modal>

      {smallScreen ? (
        <div
          className="mt-3"
          style={{
            position: "sticky",
            bottom: "0px",
            borderTop: "0.05em solid white",
          }}
        >
          <BottomNav />
        </div>
      ) : (
        <div className="mt-3">
          <Footer />
        </div>
      )}
    </>
  );
};

export default Orders;
