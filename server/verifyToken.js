import jwt from "jsonwebtoken";
import { createError } from "./err.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(
        token,
        process.env.JWtTOKENKEY,
        (err, user) => {
            if (err) {
                return next(createError(404, "Token is not valid!"));
            }
            req.user = user;
            next()
        }
    );
}