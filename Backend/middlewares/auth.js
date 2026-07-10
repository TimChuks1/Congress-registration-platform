import jwt, { decode } from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.cookie.access_token;

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET
        );

        req.admin = decoded;

        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }
};