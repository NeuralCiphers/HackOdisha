import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Auth route" });
});

router.post("/register", (req, res) => {
    res.json({ message: "Register route" });
});

router.post("/login", (req, res) => {
    res.json({ message: "Login route" });
});

router.post("/logout", (req, res) => {
    res.json({ message: "Logout route" });
});

export default router;