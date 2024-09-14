/**
 * author Thilina Pahalagedara
 * created on 14-09-2024-17h-45m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { errorMessages } from "../../errors/error.const";
import ErrorUtil from "../../errors/error.util";
import { constants } from "../../../constants";

const updateUserSanitizer = (req: Request, res: Response, next: NextFunction ) => {
    
    const inputValidationSchema = Joi.object({
        phone_number: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.PHONE_NUMBER),
            otherwise: Joi.string()
        }),
        profile_picture: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.PROFILE_PICTURE),
            otherwise: Joi.string()
        }),
        address: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().min(5).max(100).optional().messages(errorMessages.VALIDATION.ADDRESS_R),
            otherwise: Joi.string()
        }),
        highest_education_qualification: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.HIGHEST_EDUCATION_QUALIFICATION_R),
            otherwise: Joi.string()
        }),
        high_school: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.HIGH_SCHOOL_R),
            otherwise: Joi.string()
        }),
        degree: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.DEGREE_R),
            otherwise: Joi.string()
        }),
        university: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.UNIVERSITY_R),
            otherwise: Joi.string()
        }),
        previous_experience: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.PREVIOUS_EXPERIENCE_R),
            otherwise: Joi.string()
        }),
        exp_confirmation: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.EXP_CONFIRMATION_R),
            otherwise: Joi.string()
        }),
        interests: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.array().items(Joi.number()).optional().messages(errorMessages.VALIDATION.INTERESTS_R),
            otherwise: Joi.array()
        }),
        device: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.DEVICE_R),
            otherwise: Joi.string()
        }),
        employment: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.string().optional().messages(errorMessages.VALIDATION.EMPLOYMENT_R),
            otherwise: Joi.string()
        }),
        work_hours: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.number().integer().min(0).optional().messages(errorMessages.VALIDATION.WORK_HOURS),
            otherwise: Joi.number().integer().min(0)
        }),
        expected_earnings: Joi.when('role', {
            is: constants.USER_ROLES.TUTOR,
            then: Joi.number().greater(0).optional().messages(errorMessages.VALIDATION.EXP_EARNINGS_R),
            otherwise: Joi.number().greater(0)
        }),
        description: Joi.string().optional().messages(errorMessages.VALIDATION.DESCRIPTION_R),
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    })
    
    if( error )  ErrorUtil.throwValidationError(error.details);
    
    //Manipulate body data do in here

    next();

}

export default updateUserSanitizer;