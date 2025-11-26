import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

function MenuItemCard({ item }) {
  const handleAddToCart = () => {
    console.log("Add to cart:", item);
    // You can implement a cart hook here
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="text.secondary">{item.category}</Typography>
        <Typography>${item.price}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
