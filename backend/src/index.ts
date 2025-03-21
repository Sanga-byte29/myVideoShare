import express from 'express';
import connectDb from './config/db';
import dotenv from 'dotenv';

const app = express();


connectDb();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`first server running on port ${port}`);
});