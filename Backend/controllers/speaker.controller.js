import Speaker from "../models/speaker_model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

export const createSpeaker = async (req, res) => {
    let result;
    try {
        const { title, fullname, position, bio } = req.body;

        // validate required fields
        if (!title || !fullname || !position || !bio) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // validate image
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // upload image to cloudinary
        result = await cloudinary.uploader.upload(req.file.path);

        // delete local image after successful upload
        fs.unlink(req.file.path);

        // create speaker
        const speaker = await Speaker.create({
            title,
            fullname,
            position,
            bio,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });

        return res.status(201).json({
            success: true,
            message: "Speaker created successfully",
            data: {
                id: speaker.id,
                title: speaker.title,
                fullname: speaker.fullname,
                position: speaker.position,
                bio: speaker.bio,
                image: speaker.image
            }
        });

    } catch (error) {
        console.error(error);

        // delete uploaded image from cloudinary if DB fails
        if (result) {
            await cloudinary.uploader.destroy(result.public_id);
        }

        // delete local images if it still exist
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlink(req.file.path);
        }


        return res.status(500).json({
            success: false,
            message: "Error creating speaker"
        });
    }
};

export const getAllSpeakers = async (req, res) => {
    try {
        const speakers = await Speaker.find();

        // if not speaker
        if (speakers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No speaker found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Speakers fetched successfully",
            count: speakers.length,
            data: speakers
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error fetching speakers"
        });
    }
};

export const getSpeakerByIPosition = async (req, res) => {
    try {
        const { position } = req.params;

        const speakers = await Speaker.findOne(position);

        if (!speakers) {
            return res.status(404).json({
                success: false,
                message: "Speaker does not exist for this position"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Speaker found successfully",
            count: speakers.length,
            data: speakers
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error fetching speakers"
        });
    }
};

export const updateSpeaker = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, fullname, position, bio } = req.body;

        const speaker = await Speaker.findById(id);

        if (!speaker) {
            return res.status(404).json({
                success: false,
                message: "Not found"
            });
        }

        if (title) speaker.title = title;
        if (fullname) speaker.fullname = fullname;
        if (position) speaker.position = position;
        if (bio) speaker.bio = bio;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path); //upload new

            fs.unlink(req.file.path); //delete temporary file

            await cloudinary.uploader.destroy(speaker.image.public_id); //delete old image

            speaker.image = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        await speaker.save();

        return res.status(200).json({
            success: true,
            message: "Speaker udated successfully",
            data: {
                id: speaker.id,
                title: speaker.title,
                fullname: speaker.fullname,
                position: speaker.position,
                bio: speaker.bio,
                image: speaker.image
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error updating speaker"
        });
    }
};

export const deleteSpeaker = async (req, res) => {
    try {
        const { id } = req.params;

        const speaker = await Speaker.findById(id);

        if (!speaker) {
            return res.status(404).json({
                success: false,
                message: "Speaker not found"
            });
        }

        await cloudinary.uploader.destroy(speaker.image.public_id);

        await speaker.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Speaker deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error fetching speakers"
        });
    }
};