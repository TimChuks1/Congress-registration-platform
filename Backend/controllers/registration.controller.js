import Registration from "../models/registration_model.js";

export const createAttendee = async (req, res) => {
    try {
        const { fullname,
            gender,
            church,
            zone,
            school,
            department,
            level,
            phonenumber } = req.body;

        if (!fullname || !gender || !church || !zone || !school || !phonenumber) {
            return res.staus(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const totalAttendees = await Registration.countDocuments();

        const nextattendee = totalAttendees + 1;

        const registrationNumber = `ACM2026-${nextattendee.toString().padStart(4, "0")}`;

        const biblestudyclass = ((nextattendee - 1) % 10) + 1;

        const attendee = await Registration.create({
            fullname,
            gender,
            church,
            zone,
            school,
            department,
            level,
            phonenumber,
            id,
            biblestudyclass
        });

        return res.staus(200).json({
            success: true,
            message: "Successfully Registered",
            data: {
                fullname: attendee.fullname,
                id: attendee.id,
                biblestudyclass: attendee.biblestudyslass
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getAllAttendees = async (req, res) => {
    try {
        const attendees = await Registration.find();
        return res.status(200).json({
            success: true,
            message: "Attendees found successfully",
            count: attendees.length,
            data: attendees
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error retrieving Attendees"
        });
    }
};

export const getAttendeeByregistrationNumber = async (req, res) => {
    try {
        const { registrationNumber } = req.params;

        const attendee = await Registration.findOne(registrationNumber);

        if (!attendee) {
            return res.status(404).json({
                success: false,
                message: "Attendee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attendee found successfully",
            data: attendee
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error occured"
        });
    }
};

export const verifyAttendee = async (req, res) => {
    try {
        const { registrationNumber } = req.params;

        const attendee = await Registration.findOne(registrationNumber);

        if (!attendee) {
            return res.status(404).json({
                success: false,
                message: "Attendee not found"
            });
        }

        if (attendee.checkedin) {
            return res.status(400).json({
                success: false,
                message: "Attendee has alreadey been checked"
            });
        }

        attendee.checkedin = true;

        await attendee.save();

        return res.status(200).json({
            success: true,
            message: "Attendee verified successfully",
            data: {
                fullname: attendee.fullname,
                attendeeNumber: attendee.attendeeNumber,
                checkedin: attendee.checkedin
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error verifying Attendee"
        });
    }
};

export const updateAttendee = async (req, res) => {
    try {
        const { registrationNumber } = req.params;

        const {
            fullname,
            gender,
            church,
            zone,
            school,
            department,
            level,
            phonenumber
        } = req.body;

        const attendee = await Registration.findOne(registrationNumber);

        if (!attendee) {
            return res.status(404).json({
                success: false,
                message: "Attendee not found"
            });
        }

        if (fullname) attendee.fullname = fullname;
        if (gender) attendee.gender = gender;
        if (church) attendee.church = church;
        if (zone) attendee.zone = zone;
        if (school) attendee.school = school;
        if (department) attendee.department = department;
        if (level) attendee.level = level;
        if (phonenumber) attendee.phonenumber = phonenumber;

        await attendee.save();

        return res.status(200).json({
            success: true,
            message: "Attendee successfully updated",
            data: attendee
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error occured"
        });
    }
};

export const deleteAttendee = async (req, res) => {
    try {
        const { registrationNumber } = req.body;

        const attendee = await Registration.findOne(registrationNumber);

        if (!attendee) {
            return res.status(404).json({
                success: false,
                message: "Attendee not found"
            });
        }

        await attendee.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Attendee successfully deleted"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Error occured"
        });
    }
};