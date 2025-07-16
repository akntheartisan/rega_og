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
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);

  console.log(orderData);
  //   let totalPrice = 0;
  //  let districts=[];
  //   orderData.forEach((user) => {
  //     user.Purchased.forEach((purchased) => {
  //       purchased.cartData.forEach((cartData) => {
  //         console.log("Checking cartData:", cartData);

  //         if (cartData.deliverystatus === "Delivered") {

  //           console.log(cartData.subModelDetails);

  //           console.log("Delivery Status:", cartData.deliveryStatus);
  //           console.log("Price:", cartData.subModelDetails.price);

  //           districts.push(user.district)
  //           totalPrice += Number(cartData.subModelDetails.price);
  //         }
  //       });
  //     });
  //   });
  //   console.log(districts);
  // let totalPrice = 0;
  // let districts = [];

  // Keep track of which user has already added their district
  // let userDistricts = new Set();

  // orderData.forEach((user) => {
  //   user.Purchased.forEach((purchased) => {
  //     purchased.cartData.forEach((cartData) => {
  //       // Normalize district name to lowercase
  //       let normalizedDistrict = user.district.toLowerCase();

  //       if (cartData.deliverystatus === "Delivered") {
  //         if (cartData.subModelDetails && cartData.subModelDetails.price) {
  //           // Check if this user's district has already been added
  //           if (!userDistricts.has(user.id + normalizedDistrict)) {
  //             districts.push(user.district); // Add the district in its original form
  //             userDistricts.add(user.id + normalizedDistrict); // Mark this user's district as added
  //           }

  //           // Calculate total price
  //           totalPrice += Number(cartData.subModelDetails.price);
  //         }
  //       }
  //     });
  //   });
  // });

  // console.log("Total Price:", totalPrice);
  // console.log("Districts with delivered orders (allowing different users to add the same district):", districts);

  let totalPrice = 0;
  let districts = []; // To hold final districts

  orderData.forEach((user) => {
    let userDistricts = new Set();

    user.Purchased.forEach((purchased) => {
      purchased.cartData.forEach((cartData) => {
        console.log("Checking cartData:", cartData);

        if (cartData.deliverystatus === "Delivered") {
          console.log(cartData.subModelDetails);
          console.log("Delivery Status:", cartData.deliveryStatus);
          console.log("Price:", cartData.subModelDetails.price);

          userDistricts.add(user.district);
          totalPrice += Number(cartData.subModelDetails.price);
        }
      });
    });

    districts = districts.concat(Array.from(userDistricts));
  });
  localStorage.setItem("regaDistrict", districts);
  localStorage.setItem("TotalPrize", totalPrice);

  const openEdit = (order) => {
    console.log("particular order");
    setSelectedProduct(order);
    console.log(selectedProduct);
    setOpenOrderView(true);
  };

  // const getOrder = async () => {
  //   console.log("getorder");
  //   try {
  //     const response = await client.get("/cart/getCart");
  //     console.log(response.data.data);
  //     const orderData = response.data.data;
  //     setOrderData(orderData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getOrder();
  // }, []);
  // console.log("kansha",orderData);
  const getOrder = async () => {
    try {
      const response = await client.get("/cart/getCart");
      const orderData = response.data.data;
      setOrderData(orderData);
      countProducts(orderData); // Call count function after fetching orders
    } catch (error) {
      console.log(error);
    }
  };

  const countProducts = (data) => {
    let online = 0;
    let offline = 0;

    data.forEach((order) => {
      order.Purchased.forEach((purchased) => {
        if (purchased.hasOwnProperty("order_id")) {
          online += purchased.cartData.length;
        } else {
          offline += purchased.cartData.length;
        }
      });
    });

    setOnlineCount(online);
    setOfflineCount(offline);
  };

  useEffect(() => {
    getOrder();
  }, []);
  console.log(onlineCount, offlineCount);
  localStorage.setItem("onlineCount", onlineCount);
  localStorage.setItem("offlineCount", offlineCount);

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
      console.log(deliveryStatus);

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
        <TableContainer>
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
                  Color
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
                  Total Amount
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
                  Paid Amount
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
                                <p>{eachCartData.color}</p>
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
                            <>
                              <div>
                                <hr />
                                <p>{eachCartData.quantity * eachCartData.subModelDetails.price}</p>
                              </div>
                            </>
                          );
                        });
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {each.Purchased.map((eachPurchased) => {
                        return eachPurchased.cartData.map((eachCartData,i,arr) => {
                          return (
                            <>
                              <div>
                                <hr />
                                <p>{Math.round(eachPurchased.paidAmount / arr.length)}</p>
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
