import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "../context/cartContext";

function CartPage() {
  const { cart, addItem, decreaseQty, removeItem, total } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ₹{item.price}</Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </Button>

                  <Typography sx={{ mx: 2 }}>{item.qty}</Typography>

                  <Button
                    variant="outlined"
                    onClick={() => addItem(item)}
                  >
                    +
                  </Button>

                  <Button
                    color="error"
                    onClick={() => removeItem(item.id)}
                    sx={{ ml: 3 }}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Card sx={{ mt: 3, p: 2 }}>
            <Typography variant="h5">Total: ₹{total}</Typography>
          </Card>
        </>
      )}
    </Container>
  );
}

export default CartPage;
