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

    const token = await loginHandler.login(sanitizedInputs);
    return res.status(StatusCodes.OK).json({
        message: successMessages.USER_LOGIN,
        payload: {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            user: token.user
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

    await OTPHandler.requestOTP(userId);
    return res.status(StatusCodes.OK).json({
        message: successMessages.OTP_SENDED,
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