const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utIls/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
const Cart = require("../models/cartModel");


const userCart=asyncHandler(async(req,res)=>{
  const { productId, quantity,price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId:_id,
      productId,
      price,
      quantity,
    }).save();
   res.json(newCart);
  } catch(error) {
    throw new Error(error);
  }
});

const createUser = asyncHandler( async(req,res) =>{
    //check whether the user already exsist. So we are checking with email
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        //Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
        console.log("User registered Successfully..");
    }
    else
    {
        //User already exsists
        // res.json({
        //     msg:"User Already Exist",
        //     success: false,
        // });
        throw new Error("User Already Present");
    }

});

//logging controller [login as a user]
const loginUserController = asyncHandler(async(req,res) =>{
    const {email, password} = req.body;
    // console.log(email, password); //after loggin controller create the route
//Check whether the user is present or not
const findUser = await User.findOne({ email });
if(findUser && (await findUser.isPasswordMatched(password)))//isPasswordMatched method is found here.Once the password is matched it will take to the UserModel.js where it will encrypt
{
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(findUser.id,{
        refreshToken:refreshToken,
    },{
        new:true
    });
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        maxAge:72*60*60*1000,
    });
    res.json({
        _id:findUser?._id,
        firstname:findUser?.firstname,
        lastname:findUser?.lastname,
        email:findUser.email,
        mobile:findUser.mobile,
        token:generateToken(findUser?._id),
    });
}else{
      throw new Error("Invalid Login Credentials");
}
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    });
  });

//logout Functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); 
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
        refreshToken: "",
      });
      
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); 
  });

//Update a User
const updatedUser = asyncHandler(async (req, res) => {
    //console.log();
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.mobile) {
            // Duplicate key error
            return res.status(400).json({ message: 'Mobile number already in use by another user' });
        } else {
            throw new Error(error);
        }
    }
});

// Get All Users
const getallUser = asyncHandler(async(req,res) =>{
    try{
        const getUsers = await User.find();
        res.json(getUsers);

    }catch(error)
    {
        throw new Error(error);
    }
});
// Get A single User
const getaUser = asyncHandler(async(req,res) =>{
    //  console.log(req.params);
    const {id} = req.params;
    // validateMongoDbId(id);

      try
    {
        const getaUser = await User.findById(id);
         res.json({
             getaUser,
          });

    }catch(error)
    {
         throw new Error(error);
     }
});



//Delete a User

const deleteaUser = asyncHandler(async(req,res) =>{
    //console.log(req.params);
    const {id} = req.params;
    validateMongoDbId(id);

    try
    {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });

    }catch(error)
    {
        throw new Error(error);
    }
});
const blockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);

    try{
     const block=await User.findByIdAndUpdate(
        id,
        {
        isBlocked:true,
     },
     {
        new:true,
     });
     res.json({
        message:"User Blocked",
     });
    }catch(error)
    {
        throw new Error(error);
    }
});
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "User UnBlocked",
      });
    } catch (error) {
      throw new Error(error);
    }
  });

//Register a User
const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if the email or mobile already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already Present' });
    }

    // Create a new user
    const newUser = new User({ _id: "register", name, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






module.exports ={
    updatedUser,
    createUser, 
    loginUserController,
    getallUser, 
    getaUser, 
    deleteaUser, 
    blockUser, 
    unblockUser,
    handleRefreshToken,
    logout,
    userCart,
    register,
};
