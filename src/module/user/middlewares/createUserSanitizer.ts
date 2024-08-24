import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { errorMessages } from "../../errors/error.const";
import ErrorUtil from "../../errors/error.util";
import { constants } from "../../../constants";

const createUserSanitizer = (req: Request, res: Response, next: NextFunction ) => {

    const inputValidationSchema = Joi.object({
        role: Joi.string().required().valid(constants.USER_ROLES.STUDENT, constants.USER_ROLES.TUTOR).messages(errorMessages.VALIDATION.ROLE_R),
        phone_number: Joi.string().required().messages(errorMessages.VALIDATION.PHONE_NUMBER),
        address: Joi.string().min(5).max(100).required().messages(errorMessages.VALIDATION.ADDRESS_R),
        degree: Joi.string().required().messages(errorMessages.VALIDATION.DEGREE_R),
        exp_earnings: Joi.number().greater(0).required().messages(errorMessages.VALIDATION.EXP_EARNINGS_R),
        high_school: Joi.string().required().messages(errorMessages.VALIDATION.HIGH_SCHOOL_R),
        interests: Joi.array().items(Joi.string()).required().messages(errorMessages.VALIDATION.INTERESTS_R),
        is_send_uni: Joi.boolean().required().messages(errorMessages.VALIDATION.IS_SEND_UNI_R),
        work_hours: Joi.number().integer().min(0).required().messages(errorMessages.VALIDATION.WORK_HOURS),

    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    })
    
    if( error )  ErrorUtil.throwValidationError(error.details);
    
    //Manipulate body data do in here

    next();

}

export default createUserSanitizer;