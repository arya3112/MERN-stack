
const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Corrected "require" to "required"
  },
  email: {
    type: String,
    required: true, // Corrected
    unique: true,   // Ensures no duplicate emails
  },
  phone: {
    type: String,
    required: true, // Corrected
  },
  password: {
    type: String,
    required: true, // Corrected
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
// securing password with bcrypt
userSchema.pre('save',async function(next){
// before saving the content evrything comes under the pre method
// console.log("pre method",this);
const user=this;
if(!user.isModified("password")){
next();
}
try{
  const saltRound=await bcrypt.genSalt(10);
   const hash_password=await bcrypt.hash(user.password,saltRound);
   user.password=hash_password;
}catch(error){
  next(error);
}
});
userSchema.methods.generateToken=async function(){//methods is the instance method in which we can create any number of methods
  try{
    return jwt.sign({//passing payload 
      //afgter returning it will go to the controller
      userId:this._id.toString(),
      email:this.email,
      isAdmin:this.isAdmin
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn:"30d",
    }
  );

  }catch(error){
    console.error(error)

  }

};

// Define model or collection name
const User = mongoose.model("User", userSchema);

module.exports = User;
