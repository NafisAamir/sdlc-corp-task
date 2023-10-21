const jwt=require("jsonwebtoken")
const {Router}=require('express')
const {UserModel} =require("../models/User.model.js")
const userController=Router();
const bcrypt=require("bcrypt");

userController.post("/signup",(req,res)=>{
    const {email,password,confirmPassword,age}=req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Password and confirm password do not match" });
      }

    bcrypt.hash(password,5,async function(err,hash){
        if(err){
            res.send("Something went wrong,Plz try again later")
        }
        const user=new UserModel({
            email,
            password:hash,
            age
        })
        await user.save()
    })
    res.json({msg:"Signup Successfull"})
})

userController.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    const hash=user.password;
    bcrypt.compare(password,hash,function(err,result){
        if(err){
            res.send("Something went wrong,Plz try again later");
        }
        if(result){
            const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
            res.json({msg:"Login Successfull",token})
        }
        else{
            res.send("Invalid credentials,Signup if you haven't")
        }
    })

})

module.exports={userController}