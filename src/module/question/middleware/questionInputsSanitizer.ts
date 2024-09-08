/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-00h-19m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import Joi from "joi";
import { errorMessages } from "../../errors/error.const";
import errorUtil from "../../errors/error.util";
import { Request, Response, NextFunction } from "express";

const questionInputsSanitizer = async(req: Request, res: Response, next: NextFunction) => {

    const inputValidationSchema = Joi.object({
        phone_number: Joi.string().email().required().messages(errorMessages.VALIDATION.PHONE_NUMBER_R),
        question: Joi.string().required().messages(errorMessages.VALIDATION.QUESTION_R),
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
    })
    
    if( error )  errorUtil.throwValidationError(error.details);
    
    //Manipulate body data
    req.body = {
        ...req.body,
        email: req.body.email.toLowerCase(),
    };

    next(); 
}

export default questionInputsSanitizer;