import express from "express";
import videoContrllers from "../controllers/video.js";

const router=express.Router();

router.get("/",videoContrllers)

export default router;