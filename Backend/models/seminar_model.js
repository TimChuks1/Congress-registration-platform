import mongoose from "mongoose";

const semninarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    speaker: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Semninar = mongoose.model("Semninar", semninarSchema);

export default Semninar;