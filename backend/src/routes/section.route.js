import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createSection, getSections, getSectionById, deleteSection } from "../controllers/section.controller.js";

const router = express.Router();

router.post("/", protect, createSection);
router.get("/", protect, getSections);
router.get("/:id", protect, getSectionById);
router.delete("/:id", protect, deleteSection);

export default router;
