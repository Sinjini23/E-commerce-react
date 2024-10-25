const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, fetchProductDetails } = require("../controller/productCtrl");
const multer = require('multer');
// This stores the file in memory as a Buffer
const upload = multer();


//check whether the person is admin or user
const {isAdmin,authMiddleware} = require('../middlewares/authMiddleware');
const router = express.Router();
router.post("/", authMiddleware,isAdmin,createProduct);
router.get("/:id", getaProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct);
router.get("/", getAllProduct);
router.put("/:id",authMiddleware,isAdmin,updateProduct );
router.post('/api/store', upload.single('images'), createProduct);


module.exports=router;