/**
 * author Thilina Pahalagedara
 * created on 12-08-2024-22h-07m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomRequestAuth } from "../auth/auth.interface";
import { IUserMutationSanitizedInput } from "./user.interface";
import CommonUtil from "../common/common.util";
import UserGetter from "./controllers/userGetter";
import userCreator from "./controllers/userCreator";

const getUser = async( req: Request, res: Response ) => {
    const { userId } = req.auth as ICustomRequestAuth;

    const response = await UserGetter.getUserData(userId);

    res.status(StatusCodes.OK).json({
        message: "User data retrieved successfully!",
        payload: {
            first_name: response?.user?.first_name,
            last_name: response?.user?.last_name,
            user_role: response?.auth?.role_id,
            email: response?.auth?.email,
            phone_number: response?.user?.phone_number,
            profile_picture: response?.user?.profile_picture,
            is_verified: response?.auth?.is_verified,
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
        message: `${CommonUtil.capitalizedFirstLatter(role)} created successfully!`,
        payload: {
            user_role: response?.auth?.role_id,
            email: response?.auth?.email,
            is_verified: response?.auth?.is_verified,
            first_name: response?.user?.first_name,
            last_name: response?.user?.last_name,
            profile_picture: response?.user?.profile_picture,
            country_code: response.user?.country_code,
            phone_number: response.user?.phone_number,
            address: response.user?.address,
            degree: response.tutor?.degree,
            exp_earnings: response.tutor?.exp_earnings,
            high_school: response.tutor?.high_school,
            interests: response.tutor && JSON.parse(response.tutor.interests),
            is_send_uni: response.tutor?.is_send_uni,
            work_hours: response.tutor?.work_hours,
        }
    })
}

export default {
    getUser,
    createUser,
}