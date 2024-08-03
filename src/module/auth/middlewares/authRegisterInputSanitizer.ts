/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-23h-24m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import errorUtil from "../../errors/error.util";
import { errorMessages } from "../../errors/error.const";


const authRegisterInputSanitizer = ( req: Request, res: Response, next: NextFunction ) => {

    const inputValidationSchema = Joi.object({
        email: Joi.string().email().required().messages(errorMessages.VALIDATION.EMAIL_R),
        password: Joi.string().required().messages(errorMessages.VALIDATION.PASSWORD_R),
        first_name: Joi.string().required().messages(errorMessages.VALIDATION.FIRST_NAME_R),
        last_name: Joi.string().required().messages(errorMessages.VALIDATION.LAST_NAME_R),
        country_code: Joi.string().optional().messages(errorMessages.VALIDATION.COUNTRY_CODE),
        phone_number: Joi.string().optional().messages(errorMessages.VALIDATION.PHONE_NUMBER),
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    })
    
    if( error )  errorUtil.throwValidationError(error.details);
    
    //Manipulate body data
    req.body = {
        ...req.body,
        email: req.body.email.toLowerCase(),
    };

    next();
}

export default authRegisterInputSanitizer;