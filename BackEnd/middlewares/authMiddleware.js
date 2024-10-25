//verify the JWT token & check whether the user is admin or not
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
//const expressAsyncHandler = require("express-async-handler");
const multer = require('multer');



const path = require('path');

var storage = multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,'uploads/')
    },
    filename: function(req,file,cb)
    {
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})




// authMiddleware
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);

                if (!user) {
                    throw new Error('User not found');  // Throw an error if user is not found
                }

                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error('Not Authorized, token expired. Please Login again');
        }
    } else {
        throw new Error("There is no token attached to header");
    }
});

//Find the admin with the help of id
const isAdmin = asyncHandler(async(req,res,next) =>{
   // console.log(req.user);
   const {email} = req.user;
   const adminUser = await User.findOne({ email });
   if(adminUser.role !== "admin")
   {
    throw new Error('You are not an admin');
   }
   else
   {
    next();
   }
})

var upload = multer({
    storage:storage,
    fileFilter:function(req,file,callback)
    {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ){
            callback(null,true)
        }else
        {
            console.log("Only jpg and png file supported")
            callback(null, false)
        }
    },
    limits:{
        fileSize:1024*1024*2
    }
})


module.exports = {authMiddleware, isAdmin, upload};