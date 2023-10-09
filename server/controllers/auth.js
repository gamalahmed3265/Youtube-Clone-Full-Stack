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
            success: true,
            status: 200,
            message: "User had been created",
            user: newUser,
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
        const isCorrect = await bcrypt.compare(req.body.password, user.password);


        if (!isCorrect) {
            next(createError(400, "Password or email not Credential"));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWtTOKENKEY);
        const { _id,name,email,subscribers ,img} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200)
        .json(
            {
    success: true,
    status: 200,
    user:
    {_id,name,email,subscribers,img}
            }
        );

    }
    catch (error) {
        next(error);
    }
}


export const GoogleController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWtTOKENKEY);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const {_id,name,email,subscribers}=savedUser;
            const token = jwt.sign({ id: _id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(
                    {
            success: true,
            status: 200,
            user:
            {_id,name,email,subscribers}
                    }
                );
        }
    } catch (err) {
        next(err);
    }
};