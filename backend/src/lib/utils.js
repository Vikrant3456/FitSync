import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // Development → HTTP, Production → HTTPS
    const isProd = process.env.NODE_ENV !== "development";

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days
        httpOnly: true,
        secure: isProd,                     // true only on HTTPS
        sameSite: isProd ? "None" : "Lax",  // cross‑site only on HTTPS
    });

    return token;
};