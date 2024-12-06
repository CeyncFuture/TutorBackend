/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-23h-18m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IError } from "../error.interface";
// import { EmailSyntaxError, } from "nodemailer";
import InternalServerError from "../classes/InternalServerError";
import ValidationError from "../classes/ValidationError";
import NotFoundError from "../classes/NotFoundError";
import UnauthorizedError from "../classes/UnauthorizedError";
import NodeMailerError from "../classes/NodemailerError";

const handleErrors = async(error: any ,req: Request, res: Response, next: NextFunction) => {
    console.log("++++++++++++ERROR+++++++++++++");
    console.log(error);
    console.log("++++++++++++++++++++++++++++++");
    
    
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
        customError.data = error.data;
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

    // handle email send
    if (error instanceof NodeMailerError) {
        customError.statusCode = error.statusCode;
        if(error.response === "501 Error: Bad sender address syntax"){
            customError.message = "Invalid Email Address!"
        }else{
            customError.message = "Something went wrong in email sending!";
        }
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