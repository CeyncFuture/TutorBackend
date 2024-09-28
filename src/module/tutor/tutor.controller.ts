import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TutorGetter from "./controllers/tutorGetter";

const getTutors = async(req: Request, res: Response) => {
    const response = await TutorGetter.getTutors()

    res.status(StatusCodes.OK).json({
        message: "Tutors retrieved successfully!",
        payload: {
            categories: response
        }
    })
};

export default {
    getTutors
}