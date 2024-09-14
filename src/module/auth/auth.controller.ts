/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-15m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successMessages } from "./auth.const";
import { IAuthRegisterSanitizedInputs, ICustomRequestAuth, ILoginSanitizedInputs, IOTPVerifySanitizeInputs } from "./auth.interface";
import AuthRegister from "./controllers/authRegister";
import loginHandler from "./controllers/loginHandler";
import OTPHandler from "./controllers/otpHandler";


const authRegister = async( req: Request, res: Response ) => {    
    const sanitizedInputs = req.body as IAuthRegisterSanitizedInputs;

    await AuthRegister.register(sanitizedInputs);

    return res.status(StatusCodes.CREATED).json({
        message: successMessages.USER_CREATION,
    })
};

const userLogin = async( req: Request, res: Response ) => {  
    const sanitizedInputs = req.body as ILoginSanitizedInputs;

    const response = await loginHandler.login(sanitizedInputs);

    return res.status(StatusCodes.OK).json({
        message: successMessages.USER_LOGIN,
        payload: {
            access_token: response.token.access_token,
            refresh_token: response.token.refresh_token,
            user: {
                user_id: response?.user?.id,
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
                is_logged_in: true,
            },//TODO: managed above payload
        }
    })
};

const userLogout = async( req: Request, res: Response ) => {  

    return res.status(StatusCodes.OK).json({
        message: successMessages.USER_LOGOUT,
    })
};

const getOTP = async( req: Request, res: Response ) => {
    const { userId } = req.auth as ICustomRequestAuth;

    const otp = await OTPHandler.requestOTP(userId);

    return res.status(StatusCodes.OK).json({
        message: successMessages.OTP_SENDED,
        payload: {
            otp,
        }
    })
};

const verifyOTP = async( req: Request, res: Response ) => {
    const { userId } = req.auth as ICustomRequestAuth;
    const sanitizedInputs = req.body as IOTPVerifySanitizeInputs;

    await OTPHandler.verifyOTP(userId, sanitizedInputs.otp);
    return res.status(StatusCodes.OK).json({
        message: successMessages.OTP_VERIFIED,
    })
};


export default {
    authRegister,
    userLogin,
    userLogout,
    getOTP,
    verifyOTP,
}