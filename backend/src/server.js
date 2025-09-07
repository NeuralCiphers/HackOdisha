import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './configs/db.js';
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import sectionRoutes from "./routes/section.route.js";
import resourceRoutes from "./routes/resource.route.js";

const app = express();

const PORT = process.env.PORT || 3000;

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sections", sectionRoutes);
app.use("/api/v1/resources", resourceRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Home Page of the Resource Dumper App."
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 