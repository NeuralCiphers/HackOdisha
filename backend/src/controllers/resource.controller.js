import { Resource, ImageResource, PdfResource, LinkSheetResource, NoteResource } from "../models/resource.model.js";
import Section from "../models/section.model.js";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";

// Create resource (generic handler, specialized later with Multer/Cloudinary)
export const createResource = async (req, res) => {
    try {
        const { type, title, description, sectionId } = req.body;

        let uploadResult = null;
        if (req.file) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "resources",
                resource_type: type === "Pdf" ? "raw" : "image", // PDF -> raw, Images -> image
            });

            // Remove local file after upload
            fs.unlinkSync(req.file.path);
        }

        let newResource;
        switch (type) {
            case "Image":
                newResource = await ImageResource.create({
                    title,
                    description,
                    url: uploadResult?.secure_url,
                    owner: req.user._id,
                    section: sectionId,
                    size: req.file?.size || 0,
                    format: req.file?.mimetype,
                });
                break;

            case "Pdf":
                newResource = await PdfResource.create({
                    title,
                    description,
                    url: uploadResult?.secure_url,
                    owner: req.user._id,
                    section: sectionId,
                    size: req.file?.size || 0,
                    pageCount: 0, // You can later integrate pdf-lib to extract pages
                });
                break;

            case "LinkSheet":
                newResource = await LinkSheetResource.create({
                    title,
                    description,
                    links: req.body.links || [],
                    owner: req.user._id,
                    section: sectionId,
                });
                break;

            case "Note":
                newResource = await NoteResource.create({
                    title,
                    description,
                    content: req.body.content,
                    owner: req.user._id,
                    section: sectionId,
                });
                break;

            default:
                return res.status(400).json({ message: "Invalid resource type" });
        }

        if (sectionId) {
            const section = await Section.findById(sectionId);
            if (section) {
                section.stats.totalResources += 1;
                section.stats.storageUsed += newResource.size || 0;
                section.resources.push(newResource._id);
                await section.save();
            }
        }

        res.status(201).json({ success: true, resource: newResource });

    } catch (error) {
        console.error("Error uploading resource:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get resources
export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find({ owner: req.user._id });
        res.status(200).json({ success: true, resources });
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete resource
export const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!resource) return res.status(404).json({ message: "Resource not found" });

        if (resource.section) {
            const section = await Section.findById(resource.section);
            if (section) {
                section.stats.totalResources -= 1;
                section.stats.storageUsed -= resource.size || 0;
                section.resources = section.resources.filter(id => id.toString() !== resource._id.toString());
                await section.save();
            }
        }

        res.status(200).json({ success: true, message: "Resource deleted" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Note resource (title, description, content)
export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;
        const resource = await Resource.findOne({ _id: id, owner: req.user._id });
        if (!resource) return res.status(404).json({ message: "Resource not found" });

        if (resource.resourceType !== "Note") {
            return res.status(400).json({ message: "Only Note resources can be updated via this endpoint" });
        }

        const updated = await NoteResource.findByIdAndUpdate(
            id,
            {
                ...(title !== undefined ? { title } : {}),
                ...(description !== undefined ? { description } : {}),
                ...(content !== undefined ? { content, lastEdited: new Date() } : {}),
            },
            { new: true }
        );

        res.status(200).json({ success: true, resource: updated });
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

