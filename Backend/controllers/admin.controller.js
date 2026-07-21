import Admin from "../models/admin_model.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
    try {
        const { fullname, username, password, role } = req.body;

        // validate the fields required
        if (!fullname || !username || !password || !role) {
            return res.staus(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check to verify, to avoid duplicate
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        // hashing process to protect the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating the admin
        const admin = await Admin.create({
            fullname,
            username,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "Admin created succesfully",
            data: {
                id: admin._id,
                fullname: admin._fullname,
                username: admin._username,
                role: admin.role
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select("-password");
        return res.status(200).json({
            success: true,
            count: admins.length,
            message: "Admin gotten successfully",
            data: admins
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error fetching admins"
        });
    }
};

export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await Admin.findById(id).select("-password"); // (.select) to exclude the password

        // verify if the particaular admin exists
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Admin found successfully",
            data: admin
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error fetching admin"
        });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, username, password, role } = req.body;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        if (fullname) {
            admin.fullname = fullname;
        }

        if (role) {
            admin.role = role;
        }

        if (password) {
            admin.password = await bcrypt.hash(password, 10);
        }

        await admin.save();
        return res.status(200).json({
            success: true,
            message: "Admin updated successfully",
            data: {
                id: admin._id,
                fullname: admin.fullname,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error updating admin"
        });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        if (admin.role === "super_admin") {
            return res.status(403).json({
                success: false,
                message: "Super Admin account cannot be deleted"
            });
        }

        if (admin._id.toString() === req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete you own account"
            });
        }

        await admin.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Admin deleted successfully"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error deleting admin"
        });
    }
};