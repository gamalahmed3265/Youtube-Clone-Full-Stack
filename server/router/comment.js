import express from "express";
import commentContrllers from "../controllers/comment.js";

const router=express.Router();

router.get("/",commentContrllers)

export default router;