import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    collegeDetails: {
        collegeName: {
            type: String,
        },
        collegeAddress: {
            type: String,
        },
        universityName: {
            type: String,
        },
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;