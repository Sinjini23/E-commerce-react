const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const slugify = require('slugify');
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, category, brand, quantity, images, ratings } = req.body;

    console.log('Request Body:', req.body);


    // Check if title is a valid string before using slugify
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title must be a non-empty string and should not be null or undefined' });
    }

    // Generate or set the slug based on the title
    const slug = slugify(title, { lower: true });

    const newProduct = await Product.create({
      title,
      slug,
      description,
      price,
      category,
      brand,
      quantity,
      images,
      ratings,
    });

    // Check if req.file exists before trying to access its properties
    if (req.file) {
      newProduct.images = req.file.path;
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
//Fetch Product Details
const fetchProductDetails = async () => {
  try {
    console.log('Fetching data for ObjectId:', ObjectId);
    const response = await axios.get(`http://localhost:4000/api/product/${product._id}`);
    console.log('API Response:', response.data);
    setProduct(response.data);
  } catch (error) {
    console.error('Error fetching product details:', error.message);
  }
};



  //Get a Product
  const getaProduct = asyncHandler(async(req,res) =>{
    //  console.log(req.params);
    const {id} = req.params;
    //validateMongoDbId(id);
      try
    {
        const getaProduct = await Product.findById(id);
         res.json({
             getaProduct,
          });

    }catch(error)
    {
         throw new Error(error);
     }
});



//Get All Products
const getAllProduct = asyncHandler(async(req,res) =>{
    try{
        const getallProducts = await Product.find(req.query);
        res.json(getallProducts);

    }catch(error)
    {
        throw new Error(error);
    }
});

//Product Updation
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Use req.params.id to get the id
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id }, // Use _id for matching in MongoDB
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//Product Deletion
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Use req.params.id to get the id
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});






module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  fetchProductDetails,
  
};
