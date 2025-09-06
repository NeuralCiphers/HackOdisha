import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
        maxLength: 300
    },
    // Track resources
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource" // Generic Resource model (Image/PDF/LinkSheet/Note)
    }],

    // Quick analytics fields
    stats: {
        totalResources: { type: Number, default: 0 },
        totalImages: { type: Number, default: 0 },
        totalPdfs: { type: Number, default: 0 },
        totalLinkSheets: { type: Number, default: 0 },
        totalNotes: { type: Number, default: 0 },
        storageUsed: { type: Number, default: 0 } // bytes
    },

    visibility: {
        type: String,
        enum: ["private", "public", "shared"],
        default: "private"
    } // useful if later you want sharing features
}, {
    timestamps: true
});

const Section = mongoose.model("Section", sectionSchema);

export default Section;