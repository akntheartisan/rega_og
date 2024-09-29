import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import "./bottomnav.css";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import { useNavigate } from "react-router-dom";


const BottomNav = () => {
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    console.log(newValue);

    switch (newValue) {
      case "Home":
        navigate("/");
        break;
      case "About":
        navigate("/about");
        break;
      case "Product":
        navigate("/product");
        break;
      case "Contact":
        navigate("/contact");
        break;

      default:
        console.log("nothing");
    }

    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      sx={{
        backgroundColor: "#051922",
        "& .MuiBottomNavigationAction-root Mui-selected": {
          color: "white",
        },
        "& .MuiBottomNavigationAction-root": {
          color: "white",
          width:'50px'
        },
      }}
      className="bottomNavStyli"
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="About" value="About" icon={<InfoIcon />} />
      <BottomNavigationAction
        label="Product"
        value="Product"
        icon={<Inventory2Icon />}
      />
      <BottomNavigationAction
        label="Contact"
        value="Contact"
        icon={<PermPhoneMsgIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
