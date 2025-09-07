import Section from "../models/section.model.js";
import { Resource } from "../models/resource.model.js";

// Create section
export const createSection = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const section = await Section.create({
            owner: req.user._id,
            title,
            description
        });

        res.status(201).json({ success: true, section });
    } catch (error) {
        console.error("Error creating section:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all user sections
export const getSections = async (req, res) => {
    try {
        const sections = await Section.find({ owner: req.user._id }).populate("resources");
        res.status(200).json({ success: true, sections });
    } catch (error) {
        console.error("Error fetching sections:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get single section
export const getSectionById = async (req, res) => {
    try {
        const section = await Section.findOne({ _id: req.params.id, owner: req.user._id }).populate("resources");
        if (!section) return res.status(404).json({ message: "Section not found" });

        res.status(200).json({ success: true, section });
    } catch (error) {
        console.error("Error fetching section:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete section
export const deleteSection = async (req, res) => {
    try {
        const section = await Section.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!section) return res.status(404).json({ message: "Section not found" });

        // Optional: delete resources inside the section too
        await Resource.deleteMany({ section: req.params.id });

        res.status(200).json({ success: true, message: "Section deleted" });
    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
