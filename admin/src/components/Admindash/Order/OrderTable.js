import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { client } from "../../../Client/Clientaxios";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import ViewListIcon from "@mui/icons-material/ViewList";

import "./order.css";

export default function OrderTable({ product, setProduct }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderData, setOrderData] = useState([]);
  const [updateOpen, setUpdateOpen] = React.useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState("");
  const [openOrderView, setOpenOrderView] = React.useState(false);
  const [values, setValues] = useState({});

  console.log(orderData);

  const openEdit = (order) => {
    console.log("particular order");
    setSelectedProduct(order);
    console.log(selectedProduct);
    setOpenOrderView(true);
  };

  const getOrder = async () => {
    console.log("getorder");
    try {
      const response = await client.get("/cart/getCart");
      console.log(response.data.data);
      const orderData = response.data.data;
      setOrderData(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleChangeValues = (values, cartId) => {
    setValues((prev) => ({
      ...prev,
      [cartId]: values,
    }));
  };

  const deliveryStatus = async (user_id, product_id, purchased_id) => {
    console.log("deliverystatus");

    try {
      const deliveryStatus = await client.post("/user/delivery", {
        user_id,
        product_id,
        purchased_id,
        values,
      });
      console.log(deliveryStatus.status);

      if (deliveryStatus.status === 200) {
        getOrder();
        setValues({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  //   const deleteSubmit = async (id) => {
  //     console.log('deleted id:' + id);
  //     try {
  //       const response = await client.post("project/deleteproduct", {id});
  //       console.log(response);
  //       toast.error("Deleted Successfully");
  //       setDeleteOpen(false);
  //       getProduct();

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Customer Name
                </TableCell>
                  <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Phone
                </TableCell>  
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Order
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Quantity
                </TableCell>
              
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Payment Mode
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Track Id
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Order Status
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData &&
                orderData.map((each) => (
                  <TableRow
                    key={each._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {each.name}
                    </TableCell>
                    <TableCell align="center">{each.mobile}</TableCell>
                    <TableCell align="center">
                      {each.Purchased.map((eachPurchased) => {
                        return eachPurchased.cartData.map((eachCartData) => {
                          return (
                            <>
                              <div>
                                <hr />
                                <p>
                                  {eachCartData.model} -{" "}
                                  {eachCartData.subModelDetails.battery}
                                </p>
                              </div>
                            </>
                          );
                        });
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {each.Purchased.map((eachPurchased) => {
                        return eachPurchased.cartData.map((eachCartData) => {
                          return (
                            <>
                              <div>
                                <hr />
                                <p>{eachCartData.quantity}</p>
                              </div>
                            </>
                          );
                        });
                      })}
                    </TableCell>
                    
                    <TableCell align="center">
                      {each.Purchased.map((eachPurchased) => {
                        if (eachPurchased.hasOwnProperty("order_id")) {
                          return (
                            <>
                              {/* <hr/> */}
                              {eachPurchased.cartData.map((eachOrder) => {
                                return (
                                  <>
                                    <hr />
                                    <p>{eachPurchased.order_id}</p>
                                  </>
                                );
                              })}
                            </>
                          );
                        } else {
                          return (
                            <>
                                 {eachPurchased.cartData.map((eachOrder) => {
                                return (
                                  <>
                                    <hr />
                                    <p>offline</p>
                                  </>
                                );
                              })}
                              {/* <hr/>
                            {each.Purchased.map((eachPurchased)=><p>Offline</p>)} */}
                            </>
                          );
                        }
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {each.Purchased.map((eachPurchased) => {
                        return eachPurchased.cartData.map((eachCartData) => {
                          return (
                            <div className="mt-2" key={eachCartData.cartId}>
                              {eachCartData.deliverystatus === "cancelled" ? (
                                <>
                                  <hr />
                                  <p>-</p>
                                </>
                              ) : eachCartData.hasOwnProperty("trackId") ? (
                                <>
                                  <hr />
                                  <p>{eachCartData.trackId}</p>
                                </>
                              ) : (
                                <input
                                  className="form-control"
                                  type="text"
                                  style={{ borderColor: "black" }}
                                  value={values[eachCartData.cartId]}
                                  onChange={(e) =>
                                    handleChangeValues(
                                      e.target.value,
                                      eachCartData.cartId
                                    )
                                  }
                                />
                              )}
                            </div>
                          );
                        });
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {each.Purchased.map((eachPurchased) => {
                        return eachPurchased.cartData.map((eachCartData) => {
                          return (
                            <div key={eachCartData.cartId}>
                              {eachCartData.deliverystatus ===
                              "Not Delivered" ? (
                                <button
                                  className="deliverybtn"
                                  onClick={() =>
                                    deliveryStatus(
                                      each._id,
                                      eachCartData.cartId,
                                      eachPurchased._id
                                    )
                                  }
                                  disabled={
                                    !values[eachCartData.cartId] ||
                                    values[eachCartData.cartId].length < 5
                                  }
                                >
                                  Not Delivered
                                </button>
                              ) : eachCartData.deliverystatus ===
                                "cancelled" ? (
                                <>
                                  <hr />
                                  <p
                                    style={{
                                      color: "red",
                                      fontSize: "15px",
                                      fontWeight: "540",
                                    }}
                                  >
                                    Cancelled
                                  </p>
                                </>
                              ) : (
                                <>
                                  <hr />
                                  <p
                                    style={{
                                      color: "green",
                                      fontSize: "15px",
                                      fontWeight: "540",
                                    }}
                                  >
                                    Delivered
                                  </p>
                                </>
                              )}
                            </div>
                          );
                        });
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete">
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={productData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Paper>

      {/* <ProductUpdate
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        product={selectedProduct}
        setProductData={setProductData}
        getProduct={getProduct}
      />
      <ProductDelete
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        product={selectedProduct}
        deleteSubmit={deleteSubmit}
      /> */}
    </>
  );
}
