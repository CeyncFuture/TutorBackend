/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-24m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { errorMessages } from "../../errors/error.const";
import { IAuthResponse, IAuthTokenBody, ILoginSanitizedInputs } from "../auth.interface";
import AuthUtil from "../auth.util";
import UserService from "../../user/user.service";
import AuthService from "../auth.service";
import BadRequestError from "../../errors/classes/BadRequestError";

const login = async( sanitizedInputs: ILoginSanitizedInputs ) => {

    //Check email has exist account.
    const dbExistAuth = await AuthService.findByEmail(sanitizedInputs.email);
    if (!dbExistAuth)
        throw new BadRequestError(errorMessages.BAD_REQUEST.EMAIL_NOT_EXISTS);
    console.log("1");
    //Check password is correct.
    const isPasswordCorrect = await AuthUtil.compareStringWithHash(sanitizedInputs.password, dbExistAuth.password);
    if(!isPasswordCorrect)
        throw new BadRequestError(errorMessages.BAD_REQUEST.WRONG_PASSWORD);
    console.log("2");
    //Retrieve user data
    const dbExistUser = await UserService.findByAuthId(dbExistAuth.id);
    if(!dbExistUser)
        throw new BadRequestError(errorMessages.BAD_REQUEST.EMAIL_NOT_EXISTS);
    console.log("3");
    const authTokenBodyParam: IAuthTokenBody = {
        user_id: dbExistUser.id,
        role: dbExistAuth.role_id,
    }

    return AuthUtil.generateTokens(authTokenBodyParam, dbExistAuth, dbExistUser.first_name) as IAuthResponse;

}

export default {
    login,
}