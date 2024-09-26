import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Signin from "./Signin";
import Signup from "./Signup";
import userlogin from  "./userlogin.jpg"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ setUser }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (  
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${userlogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          padding:'10px',
          backdropFilter:'blur(10px)',
          borderRadius:'20px'
        }}
      >
        <Box>
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            TabIndicatorProps={{ style: { backgroundColor: 'white' } }} // Indicator color
            sx={{
              '& .MuiTab-root': {
                color: 'white', // Default text color
                '&.Mui-selected': {
                  color: 'white', // Text color when selected
                },
                '&:hover': {
                  color: 'white', // Text color on hover
                },
                '&.Mui-focusVisible': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Background color when focused
                },
              },
            }}
          >
            <Tab label="Sign In" {...a11yProps(0)} sx={{color:'white'}}/>
            <Tab label="Sign Up" {...a11yProps(1)} sx={{color:'white'}}/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Signin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Signup />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
