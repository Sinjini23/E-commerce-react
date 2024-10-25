const express = require('express');
const { createUser, loginUserController, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken, logout, userCart, register } = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();
router.post("/register",createUser);
router.post("/login",loginUserController);
router.get("/refresh",handleRefreshToken);
router.get("/logout",logout);
router.get("/all-users",getallUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/:id",authMiddleware,isAdmin, getaUser);
router.delete("/:id",deleteaUser);
router.put("/edit-user",authMiddleware,updatedUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser);
router.get("/:id",isAdmin);
router.post("/cart",authMiddleware,userCart);
router.post("/entry", register);


module.exports=router;

