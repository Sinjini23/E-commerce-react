const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    //slug - A required unique string representing the URL friendly version of the title.Converts into lowercase
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        
    },
    price: {
        type: String,
        
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: String,
        enum: ["Samsung", "Xbox", "Play Station", "One Plus", "Vizio", "Microsoft"],
    },
    quantity: {
        type: Number,
        
    },
    images: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        default :0
    },
},
{
        collection: "products"
    }
    


);

//Export the model
module.exports = mongoose.model("product", productSchema);




