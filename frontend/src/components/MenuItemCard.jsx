import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useCart } from "../context/cartContext";

function MenuItemCard({ item }) {
  const { addItem } = useCart();

  return (
    <Card sx={{ p: 1 }}>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">{item.category}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          ₹{item.price}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => addItem(item)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
