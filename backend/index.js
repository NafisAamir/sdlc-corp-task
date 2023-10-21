const express=require('express');
const app=express();
require('dotenv').config()
const {userController}=require("./routes/user.routes")
const {connection}=require("./config/db")
const {authentication}=require("../backend/middleware/authentication");
const { findcityController } = require('./routes/findcity.routes');
const cors=require("cors");
const PORT=process.env.PORT
app.use(express.json())

app.use(cors());
app.use("/user",userController)
app.use(authentication)
app.use("/weather",findcityController)


app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting to DB",error)
    }
})