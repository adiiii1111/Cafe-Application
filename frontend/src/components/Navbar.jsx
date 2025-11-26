import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Café App
        </Typography>
        <Button color="inherit" component={Link} to="/">Menu</Button>
        <Button color="inherit" component={Link} to="/cart">Cart</Button>
        <Button color="inherit" component={Link} to="/admin">Admin</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
