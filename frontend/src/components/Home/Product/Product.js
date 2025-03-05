import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { client } from "../../Client/Client";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";
import "./product.css";
import Rating from "@mui/material/Rating";

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [ratingValue, setRatingValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get("/project/getproduct");
        console.log(response.data.data);
        const productData = response.data.data;
        if (response) {
          setProduct(productData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(product);

  return (
    <>
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="section-title col-md-12">
            <h3 style={{ textAlign: "center" }}>
              <span className="orange-text">Our</span> Products
            </h3>
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              Electric scooters offer a sleek, eco-friendly transportation
              solution, combining modern design with zero emissions.
            </p>
          </div>

          {product &&
            product.map((each) => {
              return (
                <div
                  className="col-lg-4 col-md-6 productshow mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  key={each._id}
                  onClick={() => navigate(`/productview/${each._id}`)}
                >
                  <Box
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: 300,
                        height: 425,
                      },
                    }}
                  >
                    <Paper
                      elevation={5}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 0px 30px 0px",
                        // border:"1px outset orange"
                      }}
                    >
                      <div style={{ backgroundColor: "#f0f0f0" }}>
                        <img
                          src={each.image[0].url}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            marginTop: "-25px",
                          }}
                          alt="bike"
                        />
                      </div>

                      <div style={{ padding: "10px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "17px",
                              color: "#cccccc",
                              margin: "0px 0px 0px 0px",
                            }}
                          >
                            {each.model}
                          </p>
                          {/* <div>
                            <Rating
                              name="half-rating-read"
                              value={each.SubModel[0].rating}
                              precision={0.1}
                              readOnly
                            />
                            <span>{each.SubModel[0].rating}</span>
                          </div> */}
                        </div>
                        <p
                          style={{
                            fontSize: "19px",
                            color: "#3c3c3c",
                            fontWeight: "550",
                            margin: "0px 0px 0px 0px",
                          }}
                        >
                          {each.model}
                        </p>
                        <span style={{ color: "#616161" }}>
                          {each?.SubModel[0]?.battery}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span style={{ color: "#616161" }}>
                          {each?.SubModel[0]?.motor}
                        </span>
                        <br />
                        <span style={{ color: "#616161" }}>
                          {each?.SubModel[0]?.range}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <span style={{ color: "#616161" }}>
                          {each?.SubModel[0]?.payload}
                        </span>
                        <hr />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              color: "#fbb72c",
                              fontWeight: "600",
                            }}
                          >
                            ₹ {each?.SubModel[0]?.price}
                          </span>

                          <div style={{ display: "flex", gap: "3px" }}>
                            <Rating
                              name="half-rating-read"
                              value={each?.SubModel[0]?.rating}
                              precision={0.1}
                              readOnly
                            />
                            <span
                              style={{ fontStyle: "normal", fontWeight: "500" }}
                            >
                              {each?.SubModel[0]?.rating}
                            </span>
                          </div>
                        </div>
                        {/* <div style={{ display: "flex" }}>
                          <button
                            onClick={() =>
                              navigate(`/productview`, { state: each })
                            }
                            style={{
                              backgroundColor: "#f28123",
                              borderColor: "#f28123",
                              width: "100%",
                              borderRadius: "8px",
                              color: "white",
                              padding: "10px",
                              fontSize: "15px",
                            }}
                          >
                            View Product
                          </button>
                        </div> */}
                      </div>
                    </Paper>
                  </Box>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Product;
