import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createResource, getResources, deleteResource, updateResource } from "../controllers/resource.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

//router.post("/", protect, createResource);
router.post("/", protect, upload.single("file"), createResource);
router.get("/", protect, getResources);
router.put("/:id", protect, updateResource);
router.delete("/:id", protect, deleteResource);


export default router;
