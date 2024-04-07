import errorHandler from "../utils/error.js";
import { verifyToken } from "../utils/token.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { geminiToken } = req.cookies;
        if (!geminiToken) {
            return next(errorHandler(404, "Login required!"));
        }

        const decode = verifyToken(geminiToken);
        req.userId = decode.userId;
        next();
    } catch (err) {
        next(err);
    }
}