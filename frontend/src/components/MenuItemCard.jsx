import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useCart } from "../context/cartContext";

function MenuItemCard({ item }) {
  const { addItem } = useCart();

  return (
    <Card
      sx={{
        borderRadius: "22px",
        p: 2,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Playfair Display', serif",
            color: "#5B4632",
            mb: 1,
          }}
        >
          {item.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#8C6E54" }}>
          {item.category}
        </Typography>

        <Typography
          variant="h6"
          sx={{ mt: 1, fontWeight: 600, color: "#5B4632" }}
        >
          ₹{item.price}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#CBDFC8",
            color: "#5B4632",
            fontWeight: 600,
            borderRadius: "20px",
            ":hover": {
              backgroundColor: "#B7D5B1",
            },
          }}
          onClick={() => addItem(item)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
