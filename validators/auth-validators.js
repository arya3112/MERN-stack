const {z}=require("zod");
const signupSchema=z.object({
    username:z
    .string({required_error:"name is required"})
    
    .min(4,{message:"Name must be atleast 4 characters."})
    .max(255,{message:"Name must not be greater than 255 characters."}),
    email:z
    .string({required_error:"Email is required"})
    
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be atleast 3 characters."})
    .max(255,{message:"Email must not be greater than 255 characters."}),
    phone:z
    .string({required_error:"phone number is required"})
    
    .min(10,{message:"phone number must be atleast 10 characters."})
    .max(20,{message:"phone number must not be greater than 255 characters."}),
    password:z
    .string({required_error:"password is required"})
    
    .min(7,{message:"password must be atleast 7 characters."})
    .max(1024,{message:"password must not be greater than 1024 characters."}),

});
module.exports=signupSchema;
    
