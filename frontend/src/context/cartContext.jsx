import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item OR increment quantity
  const addItem = (item) => {
    const exists = cart.find((i) => i.id === item.id);

    if (exists) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // Decrease quantity OR remove if qty=1
  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (item.qty === 1) {
      removeItem(id);
    } else {
      setCart(
        cart.map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
      );
    }
  };

  // Remove completely
  const removeItem = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  // Cart total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addItem, decreaseQty, removeItem, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
