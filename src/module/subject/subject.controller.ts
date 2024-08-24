/**
 * author Thilina Pahalagedara
 * created on 24-08-2024-22h-54m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import SubjectGetter from "./controllers/subjectGetter";
import SubjectCreator from "./controllers/subjectCreator";
import { ISubjectCreationInputSanitizer } from "./subject.interface";

const getSubjects = async( req: Request, res: Response ) => {

    const response = await SubjectGetter.getSubjects()

    res.status(StatusCodes.OK).json({
        message: "Subjects retrieved successfully!",
        payload: {
            subjects: response
        }
    })
}

const createSubject = async( req: Request, res: Response ) => {

    const sanitizedInputs = req.body as ISubjectCreationInputSanitizer;
    
    await SubjectCreator.createSubject(sanitizedInputs);

    res.status(StatusCodes.CREATED).json({
        message: "Subject created successfully!",
        payload: {
        }
    })
}

export default {
    getSubjects,
    createSubject,
}