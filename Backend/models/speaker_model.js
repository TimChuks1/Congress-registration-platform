import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Speaker = mongoose.model("Speaker", speakerSchema);

export default Speaker;