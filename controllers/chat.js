import Chat from "../models/chat.js";
import errorHandler from "../utils/error.js";

export const createChat = async (req, res, next) => {
    try {
        await Chat.create({
            sender: req.userId,
            content: req.body.content
        })

        res.status(201).json({
            message: "Create chat"
        })
    } catch (err) {
        next(err);
    }
}

export const getChat = async (req, res, next) => {
    try {
        const chats = await Chat.find({ sender: req.userId });
        res.status(200).json({
            chats
        })
    } catch (err) {
        next(err);
    }
}

export const deleteChat = async (req, res, next) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return next(errorHandler(404, "Sorry, Chat not present!"));
        }

        await Chat.findByIdAndDelete(chatId);

        res.status(200).json({
            message: "Chat deleted"
        })
    } catch (err) {
        next(err);
    }
}

export const accessChat = async (req, res, next) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);

        res.status(200).json({
            chat
        })
    } catch (err) {
        next(err);
    }
}