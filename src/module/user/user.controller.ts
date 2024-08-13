/**
 * author Thilina Pahalagedara
 * created on 12-08-2024-22h-07m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response } from "express";
import { ICustomRequestAuth } from "../auth/auth.interface";
import UserGetter from "./controllers/userGetter";
import { StatusCodes } from "http-status-codes";

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

export default {
    getUser,
}