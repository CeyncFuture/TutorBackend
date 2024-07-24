/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-23h-18m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import InternalServerError from "../../errors/classes/InternalServerError";
import { IError } from "../auth.interface";
import { ValidationError } from "../../errors/classes/ValidationError";
import { NotFoundError } from "../../errors/classes/NotFoundError";
import { UnauthorizedError } from "../../errors/classes/UnauthorizedError";

const handleErrors = async(error: any ,req: Request, res: Response, next: NextFunction) => {

    //create initial error object
    let customError: IError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Something Went Wrong!",
        data: error.data || {},
    };
    
    // handle custom internal server errors
    if (error instanceof InternalServerError) {
        customError.statusCode = error.statusCode;
        customError.message = error.message;
    }

    // handle custom validation errors
    if (error instanceof ValidationError) {
        customError.statusCode = error.statusCode;
        customError.message = error.message;
    }

    // handle custom validation errors
    if (error instanceof NotFoundError) {
        customError.statusCode = error.statusCode;
        customError.message = error.message;
    }

    // handle custom validation errors
    if (error instanceof UnauthorizedError) {
        customError.statusCode = error.statusCode;
        customError.message = error.message;
    }

    return res
            .status(customError.statusCode)
            .json({
                message: customError.message,
                data: customError.data,
            });
}

export default {
    handleErrors
}