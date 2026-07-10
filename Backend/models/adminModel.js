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
}, { timestamps: true });

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;