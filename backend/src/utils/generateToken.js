import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    // sign with a consistent claim name `id`
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || "7d",
    });

    // set cookie name `jwt`
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return token;
};

export default generateToken;

