/**
 * author Thilina Pahalagedara
 * created on 12-08-2024-22h-07m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomRequestAuth } from "../auth/auth.interface";
import { IUserMutationSanitizedInput, IUserUpdateSanitizedInput } from "./user.interface";
import commonUtil from "../common/common.util";
import UserGetter from "./controllers/userGetter";
import userCreator from "./controllers/userCreator";
import userUpdater from "./controllers/userUpdater";

const getUser = async( req: Request, res: Response ) => {
    const { userId, role } = req.auth as ICustomRequestAuth;

    const response = await UserGetter.getUserData(userId, role);

    res.status(StatusCodes.OK).json({
        message: "User data retrieved successfully!",
        payload: {
            first_name: response?.user?.first_name,
            last_name: response?.user?.last_name,
            role: response?.auth?.role_id,
            email: response?.auth?.email,
            profile_picture: response?.user?.profile_picture,
            is_verified: response?.auth?.is_verified,
            country_code: response.user?.country_code,
            phone_number: response.user?.phone_number,
            address: response.user?.address,
            exp_earnings: response.tutor?.expected_earnings,
            highest_education_qualification: response.tutor?.highest_education_qualification,
            high_school: response.tutor?.high_school,
            degree: response.tutor?.degree,
            university: response.tutor?.university,
            previous_experience: response.tutor?.previous_experience,
            exp_confirmation: response.tutor?.exp_confirmation,
            interests: response.subjects,
            device: response.tutor?.device,
            employment: response.tutor?.employment,
            work_hours: response.tutor?.work_hours,
            expected_earnings: response.tutor?.expected_earnings,
            description: response.tutor?.description,
            is_logged_in: true,
        }
    })
}

const getAdminDetails = async( req: Request, res: Response ) => {

    const { shareableId } = req.params;

    const response = await UserGetter.getSharableProfileData(shareableId);

    res.status(StatusCodes.OK).json({
        message: "User data retrieved successfully!",
        payload: {
            first_name: response?.user?.first_name,
            last_name: response?.user?.last_name,
            role: response?.auth?.role_id,
            email: response?.auth?.email,
            profile_picture: response?.user?.profile_picture,
            is_verified: response?.auth?.is_verified,
            country_code: response.user?.country_code,
            phone_number: response.user?.phone_number,
            address: response.user?.address,
            exp_earnings: response.tutor?.expected_earnings,
            highest_education_qualification: response.tutor?.highest_education_qualification,
            high_school: response.tutor?.high_school,
            degree: response.tutor?.degree,
            university: response.tutor?.university,
            previous_experience: response.tutor?.previous_experience,
            exp_confirmation: response.tutor?.exp_confirmation,
            interests: response.subjects,
            device: response.tutor?.device,
            employment: response.tutor?.employment,
            work_hours: response.tutor?.work_hours,
            expected_earnings: response.tutor?.expected_earnings,
            description: response.tutor?.description,
            is_logged_in: true,
        }
    })
}

const createUser = async( req: Request, res: Response ) => {
    const { userId } = req.auth as ICustomRequestAuth;
    const sanitizedInputs = req.body as IUserMutationSanitizedInput;
    const { role } = sanitizedInputs;

    const response = await userCreator.createUser(userId, sanitizedInputs);
    
    res.status(StatusCodes.CREATED).json({
        message: `${commonUtil.capitalizedFirstLatter(role)} created successfully!`,
        payload: {
            role: response?.auth?.role_id,
            email: response?.auth?.email,
            is_verified: response?.auth?.is_verified,
            first_name: response?.user?.first_name,
            last_name: response?.user?.last_name,
            profile_picture: response?.user?.profile_picture,
            country_code: response.user?.country_code,
            phone_number: response.user?.phone_number,
            address: response.user?.address,
            exp_earnings: response.tutor?.expected_earnings,
            highest_education_qualification: response.tutor?.highest_education_qualification,
            high_school: response.tutor?.high_school,
            degree: response.tutor?.degree,
            university: response.tutor?.university,
            previous_experience: response.tutor?.previous_experience,
            exp_confirmation: response.tutor?.exp_confirmation,
            interests: response.subjects,
            device: response.tutor?.device,
            employment: response.tutor?.employment,
            work_hours: response.tutor?.work_hours,
            expected_earnings: response.tutor?.expected_earnings,
            description: response?.tutor?.description,
        },
        token: response.token
    })
}

const updateUser = async( req: Request, res: Response ) => {
    const { userId, role } = req.auth as ICustomRequestAuth;
    const sanitizedInputs = req.body as IUserUpdateSanitizedInput;

    const response = await userUpdater.updateUser(userId, role, sanitizedInputs);
    

    res.status(StatusCodes.CREATED).json({
        message: `${commonUtil.capitalizedFirstLatter(role)} created successfully!`,
        payload: {
            role: response?.auth?.role_id,
            email: response?.auth?.email,
            is_verified: response?.auth?.is_verified,
            first_name: response?.user?.first_name,
            last_name: response?.user?.last_name,
            profile_picture: response?.user?.profile_picture,
            country_code: response?.user?.country_code,
            phone_number: response?.user?.phone_number,
            address: response?.user?.address,
            exp_earnings: response?.tutor?.expected_earnings,
            highest_education_qualification: response?.tutor?.highest_education_qualification,
            high_school: response?.tutor?.high_school,
            degree: response?.tutor?.degree,
            university: response?.tutor?.university,
            previous_experience: response?.tutor?.previous_experience,
            exp_confirmation: response?.tutor?.exp_confirmation,
            interests: response?.subjects,
            device: response?.tutor?.device,
            employment: response?.tutor?.employment,
            work_hours: response?.tutor?.work_hours,
            expected_earnings: response?.tutor?.expected_earnings,
            description: response?.tutor?.description,
        }
    })
}

export default {
    getUser,
    getAdminDetails,
    createUser,
    updateUser
}