import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import WorkSpace from "./Workspace/WorkSpace";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import "./AdminDash.css"

const AdminDash = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const menuItems = [
    { text: 'Profile', path: '/admin/profile' },
    { text: 'Products', path: '/admin/primary' },
    { text: 'SubProducts', path: '/admin/project' },
    { text: 'Orders', path: '/admin/order' },
    { text: 'Contact', path: '/admin/contact' }
  ];
  return (
    <>
    
      {/* Hamburger Icon for smaller screens */}
      <div className="d-md-none">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          
          sx={{ position: 'sticky', top: 30, left: 10,marginBottom: '-100px' ,paddingRight: '20' }}
          
        >
          <MenuIcon  sx={{fontSize:"50"}}/>
        </IconButton>
      </div>

      {/* Drawer for smaller screens */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="drawer"
        >
           <List>
           <h3 className="sidebar-logo">Admin Dashboard</h3>
            {menuItems.map((item) => (
              <ListItem  key={item.text} className="mb-1"  disablePadding>
                <ListItemButton component={Link} to={item.path} className="no-hover">
                  <ListItemText primary={item.text} 
                  className="sidebar-link" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      
      <div className="row">
        <div
          className="col-md-2 d-none d-md-block"
          style={{
            minHeight: "100vh",
            background: "linear-gradient(to bottom, #1ecf73, #b7e56a)",
          }}
        >
          <Navbar />
        </div>

        <div className="col-md-10" style={{ minHeight: "100vh" }}>
          <WorkSpace />
        </div>
      </div>
    </>
  );
};

export default AdminDash;



{/* <List>
            
            {['Profile', 'Products', 'SubProducts', 'Orders', 'Contact'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={`/admin/${text.toLowerCase()}`}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}