/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-17h-25m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import QuestionCreator from "./controllers/createQuestion";
import { ICustomRequestAuth } from "../auth/auth.interface";
import { IQuestionCreationSanitizeInputs } from "./question.interface";
import QuestionGetter from "./controllers/questionGetter";

const createQuestion = async(req: Request, res: Response) => {
    
    const sanitizedInputs = req.body as IQuestionCreationSanitizeInputs;
    const { userId } = req.auth as ICustomRequestAuth;
    const files = req.files as Express.Multer.File[];

    const dbQuestion = await QuestionCreator.createQuestion(userId, sanitizedInputs, files);

    res.status(StatusCodes.CREATED).json({
        message: "Question created successfully!",
        question: dbQuestion
    })
};

const getQuestions = async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 0;

    const response = await QuestionGetter.getQuestions(page)

    res.status(StatusCodes.OK).json({
        message: "Questions retrieved successfully!",
        payload: {
            questions: response.questions,
            totalElements: response.totalElements
        }
    })
};

export default {
    createQuestion,
    getQuestions
}