import express from "express";

const app=express();

app.get("/",(req,res)=>{
    // console.log();
    // res.json(req.query);
})
app.listen(8800,()=>{
    console.log("listen");
})