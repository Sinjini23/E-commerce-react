import React, { createContext, useContext, useReducer } from "react";
import reducer from '../reducer/cartReducer';

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
  shipping_fee: 500,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addtoCart = (id, title, price) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, title, price } });
  };

  return (
    <CartContext.Provider value={{ ...state, addtoCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
