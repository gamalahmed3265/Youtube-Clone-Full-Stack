import express from "express";
import dotenv from "dotenv";

import userRouter from "./router/user.js";
import videoRouter from "./router/video.js";
import commentsRouter from "./router/comment.js";
import authRouter from "./router/auth.js";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";


const app=express();
dotenv.config();

app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/videos",videoRouter);
app.use("/api/comments",commentsRouter);


//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT=process.env.PORT||3000
app.listen(8800,()=>{
  connectDB();
    console.log(`Server Listen in port ${PORT}`);
})