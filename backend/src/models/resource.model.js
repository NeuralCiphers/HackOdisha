import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        default: null
    }, // null = no section
    type: {
        type: String,
        enum: ["IMAGE", "PDF", "LINKSHEET", "NOTE"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },

    // File fields for IMAGE + PDF
    file: {
        url: String,       // Cloudinary secure_url
        public_id: String, // Cloudinary file ID
        format: String,
        size: Number
    },

    // LinkSheets
    links: [{ url: String, title: String, description: String }],

    // Notes
    content: {
        type: String,

    },

    visibility: { type: String, enum: ["private", "public"], default: "private" },
    createdAt: { type: Date, default: Date.now }
});
const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;