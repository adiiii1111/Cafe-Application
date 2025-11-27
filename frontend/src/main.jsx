import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import { CartProvider } from "./context/cartContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ThemeProvider>
);
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </BrowserRouter>
// );