import mongoose from "mongoose";

const bibleStudySchema = new mongoose.Schema({
    topic: {
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

const BibleStudy = mongoose.model("BibleStudy", bibleStudySchema);

export default BibleStudy;