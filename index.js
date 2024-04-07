import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoDB from './database.js';
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://gemini-ai-bygagan.netlify.app',
    credentials: true
}));

// Routes:
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
// Database Connection:
mongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Error Handling:
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})