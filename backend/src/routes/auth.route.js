import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: true, message: "Welcome to the Home page of the Auth Route." });
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

// Protected route example
router.get("/profile", protect, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.name}, you have accessed a protected route!`, user: req.user });
});

export default router;