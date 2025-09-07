import User from "../models/user.model.js";

// Get logged-in user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update profile details
export const updateProfile = async (req, res) => {
    try {
        const { name, collegeDetails } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (collegeDetails) user.collegeDetails = { ...user.collegeDetails, ...collegeDetails };

        await user.save();
        res.status(200).json({ success: true, message: "Profile updated", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
