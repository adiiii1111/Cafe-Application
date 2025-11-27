import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline} from "@mui/material";
import theme from "./theme.js";
import { CartProvider } from "./context/cartContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />   {/* ← ADD THIS */}
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ThemeProvider>
);