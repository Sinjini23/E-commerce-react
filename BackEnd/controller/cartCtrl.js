const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { user, product, quantity, price } = req.body;

    const newItem = await Cart.create({
      user,
      product,
      quantity,
      price,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params; 
  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');

    res.json({
      cartItems, 
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const updatedCartItem = await Cart.findByIdAndUpdate(
      itemId,
      { quantity },
      { new: true }
    );

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { itemId } = req.params;

    const removedItem = await Cart.findByIdAndRemove(itemId);

    res.status(200).json(removedItem);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  addToCart,
  getCart,
  updateCartItemQuantity,
  removeFromCart,
};
