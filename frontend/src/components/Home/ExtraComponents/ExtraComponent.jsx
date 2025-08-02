import React, { useEffect, useState } from "react";
import "./extraComponent.css";
import { client } from "../../Client/Client";
import Paper from "@mui/material/Paper";

const ExtraComponent = () => {
  const [component, setComponent] = useState([]);
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
      <div className="container" style={{ padding: "20px" }}>
        <div className="row">
          <div className="section-title col-md-12">
            <h3 style={{ textAlign: "center" }}>
              <span className="orange-text">Our</span> E‑Bike Components
            </h3>
            <p style={{ textAlign: "center", fontWeight: "600" }}>
              Electric scooters offer a sleek, eco-friendly transportation
              solution, combining modern design with zero emissions.
            </p>
          </div>
          {component &&
            component.map((each) => {
              return (
               <div
                  className="col-lg-4 col-md-6 productshow mt-5"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  key={each._id}
                  // onClick={() => navigate(`/productview/${each._id}`)}
                >
                  <div style={{width:'100%'}}>
                    <Paper
                      elevation={5}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 0px 20px 0px",
                        // border:"1px outset orange"
                      }}
                    >
                      <div style={{ backgroundColor: "#f0f0f0" }}>
                        <img
                          src={each.image.secure_url}
                          style={{
                            width: "100%",
                            height: "270px",
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
                            {each.name}
                          </p>
                    
                        </div>
                        <p
                          style={{
                            fontSize: "19px",
                            color: "#3c3c3c",
                            fontWeight: "550",
                            margin: "0px 0px 0px 0px",
                          }}
                        >
                          {each.name}
                        </p>
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
                            ₹ {each?.price}
                          </span>

                           <button
                            // onClick={() =>
                            //   navigate(`/productview`, { state: each })
                            // }
                            style={{
                              backgroundColor: "#f28123",
                              borderColor: "#f28123",
                              borderRadius: "8px",
                              color: "white",
                              padding: "10px",
                              fontSize: "15px",
                            }}
                          >
                           Show More
                          </button>

                        </div>
                        <div style={{ display: "flex" }}>
                         
                        </div>
                      </div>
                    </Paper>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ExtraComponent;
