const jwt = require("jsonwebtoken");
require('dotenv').config();
const expressJwt=require("express-jwt");
const User = require("../models/user");

exports.signUp = async (req,res)=>{
  const userExists = await User.findOne({email : req.body.email})
  if(userExists){
    return res.status(403).json({error:"Email Is Taken"})
  }
  const user=await new User(req.body)
  await user.save()
  res.status(200).json({message:"Signup Success! Please Login."})
};


exports.signIn = (req,res)=>{

  //FIND THE USER BASED ON EMAIL
  const {email,password}=req.body;
  //IF ERROR OR NO USER
  User.findOne({email},(err,user)=>{
    if(err || !user){
      return res.status(401).json({error:"user with this email does not exist!"})
    }
    //if user found match that email with the password
    //create authenticate method in model and use it here
    if(!user.authenticate(password)){
        return res.status(401).json({error:"Email and password do not match"})
    }

  //GENERATE A TOKEN WITH USER ID AND SECRET
  const token=jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  //PERSIST THE TOKEN as 't' in cookie with expiry date
  res.cookie("t",token,{expire: new Date() + 9999})
  //return response with a user and token to the front-end client
  const {_id,name,email} = user
    return res.json({token,user:{_id,email,name} });
});
};


exports.signOut = (req,res)=>{
  res.clearCookie("t")
  return res.json({message:"Successfully Logged Out!!!"})
};

exports.requiresignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
  userProperty: "auth",

})
