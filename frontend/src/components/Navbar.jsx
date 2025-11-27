import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BoxArts Art Café
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Menu
        </Button>

        <Button color="inherit" component={Link} to="/admin">
          Admin
        </Button>

        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={itemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
