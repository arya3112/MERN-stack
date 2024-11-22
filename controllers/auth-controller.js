//functionality will be controller all the main actions will be kept in controllers.
//dispatch-it carries out action and action-actionis description of what we want to do.//but in express it is controller
//controllers are typically used to process the incoming request.(request comes from router)
// controllers/auth-controller.js
const User = require("../models/user-model");
const bcrypt=require("bcryptjs")
// Controller to handle the home route
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to SBD Fitness Studios");
  } catch (error) {
    console.error("Error in home controller:", error);
    res.status(500).send("Server Error");
  }
};

// Controller to handle user registration
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({email});
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    // hash the password
    // const saltRound=10;
    // const hash_password=await bcrypt.hash(password,saltRound);

    
    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).json({ msg:userCreated,token:await userCreated.generateToken(),userId:userCreated._id.toString(),});
  } catch (error) {
   // console.error("Error in register controller:", error);
   // res.status(500).json({ msg: "Server Error" });
   next(error);
  }
};
// Controller to handle user login

const login=async(req,res)=>{
  try{
    const{email,password}=req.body;
    const userExist =await User.findOne({email});
    console.log(userExist);
    if(!userExist){
      return res.status(400).json({message:"invalid credentials"})
    }
    const user= await bcrypt.compare(password,userExist.password);
    if(user){
      res.status(200).json({ msg:"login successful",token:await userExist.generateToken(),userId:userExist._id.toString(),});
    }else{
      res.status(401).json({message:"Invalid email or password"})
    }

  }
  catch(error){
    res.status(500).json({ msg: "Server Error" });

  }
}

// Exporting the functions
module.exports = { home, register,login };
