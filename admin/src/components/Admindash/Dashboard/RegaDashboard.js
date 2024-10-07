import React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";
import ChartComponent from "./ChartComponent";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BarChartIcon from "@mui/icons-material/BarChart";
import ProductDoughnutChart from "./ProductDoughnutChart";
import DistrictChart from "./DistrictChart";
import "./Dashboard.css";

const RegaDashboard = ({ userCount, users }) => {

    const totalPrice = parseFloat(localStorage.getItem("TotalPrize")) || 0;
    const onlineCount = parseFloat(localStorage.getItem("onlineCount")) || 0;
    const offlineCount = parseFloat(localStorage.getItem("offlineCount")) || 0;
    console.log(users);
  
    // const districts = users
    //   .filter(user => user.district)
    //   .map(user => user.district);
  
    // console.log(districts);
    const rega = localStorage.getItem("regaDistrict");
    console.log(rega);
    const regaArray = rega ? rega.split(",") : [];
    console.log("Converted array:", regaArray);
  return (
    <>
      <div className="container-fluid dashboard-container">
        <Typography variant="h4" className="text-center" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>

        <div className="row">
          <div className="card">
            <div className="card-header">
              <PersonIcon className="icon" />
              <h2>No of Users</h2>
            </div>
            <div className="number">{userCount}</div>
          </div>
          <div className="card">
            <div className="card-header">
              <CurrencyRupeeIcon className="icon" />
              <h2>Total Earnings</h2>
            </div>
            <div className="number">₹ {totalPrice.toLocaleString()}</div>
          </div>
          <div className="card">
            <div className="card-header">
              <BarChartIcon className="icon" />
              <h2>Online Products</h2>
            </div>
            <div className="number">{onlineCount}</div>
          </div>
          <div className="card">
            <div className="card-header">
              <BarChartIcon className="icon" />
              <h2>Offline Products</h2>
            </div>
            <div className="number">{offlineCount}</div>
          </div>
        </div>

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <ChartComponent
                  userCount={userCount}
                  totalEarnings={totalPrice}
                  onlineCount={onlineCount}
                  offlineCount={offlineCount}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <DistrictChart districtData={regaArray} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ p: 2, height: { xs: "30vh", sm: "50vh", md: "50vh" } }}
              >
                <ProductDoughnutChart
                  onlineCount={onlineCount}
                  offlineCount={offlineCount}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default RegaDashboard