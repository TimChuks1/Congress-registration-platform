import adminModel from "../models/admin_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSignUp = async (req, res) => {
    try {
        const { fullname, username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await adminModel.create({ fullname, username, password });

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminModel.findOne({ username, password });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Admin password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin Login successfully", admin
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

