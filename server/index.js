import express from "express";
import dotenv from "dotenv";

const app=express();
dotenv.config();


app.get("/",(req,res)=>{
    console.log(process.env.mongoConnectId);
    // res.json(req.query);
})

app.listen(8800,()=>{
    console.log("listen");
})