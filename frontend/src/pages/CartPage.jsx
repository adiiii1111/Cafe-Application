import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useCart } from "../context/cartContext";

function CartPage() {
  const { cart, addItem, decreaseQty, removeItem, total } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "text.primary",
        }}
      >
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}>
          Your cart is empty ☕
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 3,
                borderRadius: 4,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Price: ₹{item.price}
                    </Typography>
                  </Box>
                </Box>

                {/* Quantity Controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => decreaseQty(item.id)}
                    sx={{
                      minWidth: 36,
                      borderRadius: "50%",
                      fontSize: 18,
                    }}
                  >
                    –
                  </Button>

                  <Typography sx={{ mx: 3, fontSize: 18, fontWeight: 600 }}>
                    {item.qty}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItem(item)}
                    sx={{
                      minWidth: 36,
                      borderRadius: "50%",
                      fontSize: 18,
                    }}
                  >
                    +
                  </Button>

                  <Button
                    color="error"
                    onClick={() => removeItem(item.id)}
                    sx={{ ml: 4, fontWeight: 600 }}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Total Amount */}
          <Card
            sx={{
              mt: 3,
              p: 3,
              borderRadius: 4,
              background: "rgba(245, 235, 220, 0.9)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Total: ₹{total}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: 18,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </>
      )}
    </Container>
  );
}

export default CartPage;
