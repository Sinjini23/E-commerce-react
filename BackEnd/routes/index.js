const express = require("express");
const dbConnect = require('../config/dbConnect');
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRouter = require("../routes/authRoute");
const productRouter = require("../routes/productRoute");
const { errorHandler } = require("../middlewares/errorHandler");
const { notFound } = require("../middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cartRouter = require("../routes/cartRoute");

const cors = require("cors"); 
const register = require('../routes/authRoute'); 
const CartItem = require('../models/cartModel');

dbConnect(); 

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))
app.use('/api/user/register', register);







app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter); 
//pass the middlewares
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
