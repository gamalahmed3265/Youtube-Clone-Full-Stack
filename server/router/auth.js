import express from "express";
import {SinUpController,SinInController,GoogleController} from "../controllers/auth.js";

const router=express.Router();

//create user
router.post("/signup",SinUpController)

//Sign in
router.post("/signin",SinInController)

//Google auth
router.post("/google",GoogleController)

export default router;