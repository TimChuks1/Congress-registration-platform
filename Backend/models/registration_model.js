import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    gender: {
        type: String,
    },
    church: {
        type: String,
    },
    zone: {
        type: String,
    },
    school: {
        type: String,
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
    biblestudyclass: {
        type: Number,
    },
    checkedin: {
        type: Boolean,
    },
}, { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;