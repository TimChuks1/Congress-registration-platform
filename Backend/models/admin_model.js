import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        typ: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["super_admin", "admin"],
        required: true
    },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;