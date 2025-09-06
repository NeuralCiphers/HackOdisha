import mongoose from "mongoose";

const options = {
    discriminatorKey: "resourceType",
    timestamps: true
};

// ==========================
// Base Resource Schema
// ==========================
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
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500
    },
    cloudinaryId: { type: String },
    url: { type: String },
    size: { type: Number, default: 0 },
    visibility: {
        type: String,
        enum: ["private", "public", "shared"],
        default: "private"
    },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
    version: { type: Number, default: 1 },
}, options);

const Resource = mongoose.model("Resource", resourceSchema);

// ==========================
// Discriminators
// ==========================

// 📸 Image Resource
const imageResourceSchema = new mongoose.Schema({
    format: { type: String },
    dimensions: {
        width: Number,
        height: Number
    }
});
const ImageResource = Resource.discriminator("Image", imageResourceSchema);

// 📄 PDF Resource
const pdfResourceSchema = new mongoose.Schema({
    pageCount: { type: Number },
    format: { type: String, default: "pdf" }
});
const PdfResource = Resource.discriminator("Pdf", pdfResourceSchema);

// 🔗 Link Sheet Resource
const linkSheetResourceSchema = new mongoose.Schema({
    links: [{
        url: { type: String, required: true },
        description: { type: String, trim: true }
    }]
});
const LinkSheetResource = Resource.discriminator("LinkSheet", linkSheetResourceSchema);

// 📝 Note Resource
const noteResourceSchema = new mongoose.Schema({
    content: { type: String, required: true },
    wordCount: { type: Number },
    lastEdited: { type: Date, default: Date.now }
});
const NoteResource = Resource.discriminator("Note", noteResourceSchema);

// ==========================
// Exports
// ==========================
export {
    Resource,
    ImageResource,
    PdfResource,
    LinkSheetResource,
    NoteResource
};
