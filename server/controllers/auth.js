import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../err.js";
import jwt from "jsonwebtoken";

export const SinUpController = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).json({
            message: "User had been created"
        });
    } catch (error) {
        next(error);
    }
}
export const SinInController = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            next(createError(404, "User Not Found"));
        }
    const isCorrect=bcrypt.compareSync(req.body.password,user.password);


    if (!isCorrect) {
        next(createError(400, "Password or email not Credential"));
    }
    const token=jwt.sign({id:user._id},process.env.JWtTOKENKEY);
    const {password,...other}=user._doc
    res.cookie("access_token",token,{
        httpOnly:true,
    }).status(200).json(other);

    }
    catch (error) {
        next(error);
    }
}
export const GoogleController = (req, res) => {
    res.json("dfa");
}