import mongoose from "mongoose";

const hymnalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Hymnal = mongoose.model("Hymnal", hymnalSchema);

export default Hymnal;