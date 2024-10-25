const mongoose = require('mongoose'); // Erase if already required//!mdbgum//login
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        
    },

    email:{
        type:String,
       
        unique:true,
    },
    mobile:{
        type:String,
       
        unique:true,
    },
    password:{
        type:String,
       
    },
    role:{
        type:String,
        default:'user',
    },
    isBlocked: {
        type:Boolean,
        default:false,
    }, 
    cart:{
        type: Array,
        default: [],
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref:"Address"}],
    
    refreshToken:{
        type:String,
    }
},{
    timestamps:true,
});
//encrypt the password
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSaltSync(10);  //using sync
    this.password = await bcrypt.hash(this.password,salt);
});
//match the password (if the password is correct return true else false)
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);