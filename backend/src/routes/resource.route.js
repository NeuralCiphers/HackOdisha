import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createResource, getResources, deleteResource } from "../controllers/resource.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

//router.post("/", protect, createResource);
router.get("/", protect, getResources);
router.delete("/:id", protect, deleteResource);
router.post("/", protect, upload.single("file"), createResource);

export default router;
