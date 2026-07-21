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
    position: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        photo_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
}, { timestamps: true });

const Speaker = mongoose.model("Speaker", speakerSchema);

export default Speaker;