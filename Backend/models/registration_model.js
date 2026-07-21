import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    church: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    department: {
        type: String,
    },
    level: {
        type: String,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    biblestudyclass: {
        type: Number,
        default: null
    },
    checkedin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;