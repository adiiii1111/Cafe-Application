import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(234, 206, 219, 0.8)", // pastel pink
        backdropFilter: "blur(12px)",
        color: "#5B4632",
        padding: "12px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#5B4632",
          }}
        >
          BoxArts Art Café
        </Typography>

        {/* Navigation */}
        <div>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#5B4632",
              mx: 1,
             backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "14px",
              px: 2,
              ":hover": {
                backgroundColor: "#CBDFC8", // pastel leafy mint
              },
            }}
          >
            Menu
          </Button>

          <Button
            component={Link}
            to="/admin"
            sx={{
              color: "#5B4632",
              mx: 1,
              backgroundColor: "rgba(255,255,255,0.4)",
              borderRadius: "14px",
              px: 2,
              ":hover": {
                backgroundColor: "#CBDFC8",
              },
            }}
          >
            Admin
          </Button>

          {/* Cart */}
          <IconButton
            component={Link}
            to="/cart"
            sx={{
              ml: 2,
              backgroundColor: "#CBDFC8",
              borderRadius: "16px",
              padding: "6px 12px",
              ":hover": {
                backgroundColor: "#B8D7B3",
              },
            }}
          >
            <Badge
              badgeContent={itemCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#CFA66A",
                  color: "#fff",
                  fontWeight: "bold",
                },
              }}
            >
              <ShoppingCartIcon sx={{ color: "#5B4632" }} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
