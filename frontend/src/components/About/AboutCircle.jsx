import React from 'react';
import { Grid, Container } from '@mui/material'; // Importing MUI components
import './AboutCircle.css'; // Importing the custom styles
import VerifiedIcon from '@mui/icons-material/Verified';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const AboutCircle = () => {
  return (
    <>
      <h2 style={{
        color: "#F28123",
        fontSize: "2.5rem",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "5px"
      }}>Why Choose Us?</h2>
      
      <Container style={{ padding: "30px", display: 'flex', justifyContent: 'center' }}>
        <Grid 
          container 
          spacing={4} // Spacing applied here to the Grid container
          justifyContent="center" // Center horizontally
          alignItems="center" // Center vertically
        >
          {/* First Card */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={4} 
            sx={{ paddingLeft: { lg: 10 } }} // Apply paddingLeft only on large screens
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="custom-card">
              <div className="custom-card__face custom-card__face--front">
                <VerifiedIcon fontSize="large" style={{ marginBottom: '10px' }} />
                <p className="custom-card-title">Benefits</p>
              </div>
              <div className="custom-card__face custom-card__face--back">
                <VerifiedIcon fontSize="large" style={{ marginBottom: '10px' }} />
                <p className="custom-card-text">Our products are made from the finest ingredients to support your health.</p>
              </div>
            </div>
          </Grid>

          {/* Second Card */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={4} 
            sx={{ paddingLeft: { lg: 10 } }} // Apply paddingLeft only on large screens
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="custom-card">
              <div className="custom-card__face custom-card__face--front">
                <PriceCheckIcon fontSize="large" style={{ marginBottom: '10px' }} />
                <p className="custom-card-title">Savings</p>
              </div>
              <div className="custom-card__face custom-card__face--back">
                <PriceCheckIcon fontSize="large" style={{ marginBottom: '10px' }} />
                <p className="custom-card-text">Enjoy great savings on high-quality herbal products.</p>
              </div>
            </div>
          </Grid>

          {/* Third Card */}
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={4} 
            sx={{ paddingLeft: { lg: 10 } }} // Apply paddingLeft only on large screens
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="custom-card">
              <div className="custom-card__face custom-card__face--front">
                <LocalShippingIcon fontSize="large" style={{ marginBottom: '10px' }} />
                <p className="custom-card-title">Support</p>
              </div>
              <div className="custom-card__face custom-card__face--back">
                <LocalShippingIcon fontSize="large" style={{ marginBottom: '10px' }} />
                <p className="custom-card-text">Our customer support team is here to help you with any questions.</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutCircle;
