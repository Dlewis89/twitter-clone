import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
    connectMongoDB();
});