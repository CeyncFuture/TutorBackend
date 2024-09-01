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
        highest_education_qualification: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.HIGHEST_EDUCATION_QUALIFICATION_R),
            otherwise: Joi.string()
        }),
        high_school: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.HIGH_SCHOOL_R),
            otherwise: Joi.string()
        }),
        degree: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.DEGREE_R),
            otherwise: Joi.string()
        }),
        university: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.UNIVERSITY_R),
            otherwise: Joi.string()
        }),
        previous_experience: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.PREVIOUS_EXPERIENCE_R),
            otherwise: Joi.string()
        }),
        exp_confirmation: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.EXP_CONFIRMATION_R),
            otherwise: Joi.string()
        }),
        interests: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.array().items(Joi.number()).required().messages(errorMessages.VALIDATION.INTERESTS_R),
            otherwise: Joi.array()
        }),
        device: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.DEVICE_R),
            otherwise: Joi.string()
        }),
        employment: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().required().messages(errorMessages.VALIDATION.EMPLOYMENT_R),
            otherwise: Joi.string()
        }),
        work_hours: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.number().integer().min(0).required().messages(errorMessages.VALIDATION.WORK_HOURS),
            otherwise: Joi.number().integer().min(0)
        }),
        expected_earnings: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.number().greater(0).required().messages(errorMessages.VALIDATION.EXP_EARNINGS_R),
            otherwise: Joi.number().greater(0)
        }),
        description: Joi.when('role', {
            is: constants.USER_ROLES.STUDENT,
            then: Joi.string().required().messages(errorMessages.VALIDATION.DESCRIPTION_R),
            otherwise: Joi.string()
        })
    }).unknown();

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    })
    
    if( error )  ErrorUtil.throwValidationError(error.details);
    
    //Manipulate body data do in here

    next();

}

export default createUserSanitizer;