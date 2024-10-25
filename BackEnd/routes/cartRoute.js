const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');


router.post('/api/cart/add',authMiddleware, isAdmin, cartController.addToCart);
router.get('/api/cart/:userId',authMiddleware, isAdmin, cartController.getCart);
router.put('/api/cart/update/:itemId',authMiddleware, isAdmin,cartController.updateCartItemQuantity);
router.delete('/api/cart/remove/:itemId', authMiddleware,isAdmin,cartController.removeFromCart);

module.exports = router;
