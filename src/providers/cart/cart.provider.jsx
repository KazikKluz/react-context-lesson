import React, { createContext, useState, useEffect } from "react";

import { addItemToCart, removeItemFromCart } from "./cart.utils";

export const CartContext = createContext({
  cartItems: [],
  cartItemsCount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));

  return (
    <CartContext.Provider
      value={{ hidden, toggleHidden, cartItems, addItem, cartItemsCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
