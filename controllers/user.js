import User from '../models/user.js';
import errorHandler from '../utils/error.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateToken } from '../utils/token.js';

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, profilephoto } = req.body;
        if (!username) {
            return next(errorHandler(404, "Please enter username!"));
        }
        if (!email) {
            return next(errorHandler(404, "Please enter email!"));
        }
        if (!password) {
            return next(errorHandler(404, "Please enter password!"));
        }

        // is user already present?
        const user = await User.findOne({ email });
        if (user) {
            return next(errorHandler(404, "Email is already registered!"));
        }

        // convert normal password to hashed password.
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            profilephoto
        })

        res.status(201).json({
            message: 'Register Successfully'
        })
    } catch (err) {
        next(err);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return next(errorHandler(404, "Please enter email!"));
        }
        if (!password) {
            return next(errorHandler(404, "Please enter password!"));
        }

        // is user already present?
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return next(errorHandler(404, "Email not registered!"));
        }

        // compare password.
        const passwordMatch = await comparePassword(password, userExist.password);
        if (!passwordMatch) {
            return next(errorHandler(404, "Invalid Email or Password"));
        }

        const token = generateToken({
            userId: userExist._id
        }, {
            expiresIn: "7d"
        })

        const user = {
            username: userExist.username,
            email: userExist.email,
            profilephoto: userExist.profilephoto
        }

        res.status(200).cookie('geminiToken', token, {
            maxAge: 604800000, // 7 Days
            httpOnly: true
        }).json({
            message: `Welcome ${user.username}`,
            user
        })
    } catch (err) {
        next(err);
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie('geminiToken').status(200).json({
        message: "Logged out successfully!"
    });
}

export const validCookieCheckLogin = async (req, res, next) => {
    try {
        const userExist = await User.findById(req.userId);

        const user = {
            username: userExist.username,
            email: userExist.email,
            profilephoto: userExist.profilephoto
        }

        res.status(200).json({
            message: `Welcome ${user.username}`,
            user
        })
    } catch (err) {
        next(err);
    }
}