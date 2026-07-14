import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({

}, { timestamps: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;