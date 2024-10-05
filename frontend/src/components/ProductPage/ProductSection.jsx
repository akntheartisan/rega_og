import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { client } from "../../components/Client/Client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./ProductSection.css";

const ProductSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get("/project/getproduct");
        const productData = response.data.data;
        if (productData) {
          setProducts(productData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ padding: "20px", border: "5px solid #F28123" }}
    >
      <div className="section-title">
        <h3 style={{ textAlign: "center" }}>
          <span className="orange-text">Our</span> Products
        </h3>
        <p style={{ textAlign: "center", fontWeight: "600" }}>
          Electric scooters offer a sleek, eco-friendly transportation solution,
          combining modern design with zero emissions.
        </p>
      </div>

      <Grid container spacing={2}>
        {products.map((each) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={each._id}>
            <div
              className="productshow"
              onClick={() => navigate(`/productview`, { state: each })}
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                marginBottom: "30px",
              }}
            >
              <Box
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "100%",
                    maxWidth: 300,
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
                  }}
                >
                  <div style={{ backgroundColor: "#f0f0f0" }}>
                    <img
                      src={each.image.url}
                      alt={each.model}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        marginTop: "-25px",
                      }}
                    />
                  </div>

                  <div style={{ padding: "10px" }}>
                    <p
                      style={{
                        fontSize: "17px",
                        color: "#cccccc",
                        margin: "0px",
                      }}
                    >
                      {each.model}
                    </p>
                    <p
                      style={{
                        fontSize: "19px",
                        color: "#3c3c3c",
                        fontWeight: "550",
                        margin: "0px",
                      }}
                    >
                      {each.model}
                    </p>
                    <span style={{ color: "#616161" }}>
                      {each.SubModel[0].battery}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span style={{ color: "#616161" }}>
                      {each.SubModel[0].motor}
                    </span>
                    <br />
                    <span style={{ color: "#616161" }}>
                      {each.SubModel[0].range}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span style={{ color: "#616161" }}>
                      {each.SubModel[0].payload}
                    </span>
                    <hr />
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#fbb72c",
                        fontWeight: "600",
                      }}
                    >
                      ₹ {each.SubModel[0].price}
                    </span>
                  </div>
                </Paper>
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductSection;
