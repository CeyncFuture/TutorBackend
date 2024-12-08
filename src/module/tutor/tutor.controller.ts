import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TutorGetter from "./controllers/tutorGetter";

const getTutors = async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 0;

    const response = await TutorGetter.getTutors(page)

    res.status(StatusCodes.OK).json({
        message: "Tutors retrieved successfully!",
        payload: {
            tutors: response
        }
    })
};

export default {
    getTutors
}