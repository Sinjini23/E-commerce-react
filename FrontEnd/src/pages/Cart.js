import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - Quantity: {item.quantity} - Total: ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
