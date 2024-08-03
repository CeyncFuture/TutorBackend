/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-15m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successMessages } from "./auth.const";
import { IAuthRegisterSanitizedInputs, ILoginSanitizedInputs } from "./auth.interface";
import AuthRegister from "./controllers/authRegister";
import loginHandler from "./controllers/loginHandler";


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
}


export default {
    authRegister,
    userLogin,
}