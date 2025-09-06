import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    visibility: {
        type: String,
        enum: ["private", "public"],
        default: "private"
    },
}, {
    timestamps: true
});

const Section = mongoose.model("Section", sectionSchema);

export default Section;