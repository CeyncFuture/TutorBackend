/**
 * author Thilina Pahalagedara
 * created on 11-08-2024-02h-40m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

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


const otpVerifyInputSanitizer = ( req: Request, res: Response, next: NextFunction ) => {

    const inputValidationSchema = Joi.object({
        otp: Joi.string().required().messages(errorMessages.VALIDATION.OTP_R),
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    })
    
    if( error )  errorUtil.throwValidationError(error.details);

    next();
}

export default otpVerifyInputSanitizer;