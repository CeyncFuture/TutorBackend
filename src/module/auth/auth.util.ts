/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-12h-02m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { constants } from "../../constants";
import bcrypt from "bcryptjs";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { IAuthResponse, IAuthTokenBody } from "./auth.interface";
import { IAuth } from "../auth/auth.interface";
import UnAuthorizedError from "../errors/classes/UnauthorizedError";

//Bcrypt functions
const encryptString = async( payload: string ): Promise<string> => {
    const salt = await bcrypt.genSalt(constants.SESSIONS.PASSWORD_SALT_ROUND as number);
    return await bcrypt.hash(payload, salt);
}

const compareStringWithHash = async( payload: string, hash: string ): Promise<boolean> => {
    return await bcrypt.compare(payload, hash);
}

//JWT functions
const generateTokens = ( payload: IAuthTokenBody ): IAuthResponse => {
    
    //Create access token
    const access_token = jwt.sign(
        {   
            ...payload, 
            type: constants.SESSIONS.TOKENS.ACCESS_TOKEN.NAME,
        }, 
        constants.SESSIONS.TOKENS.SECRET_KEY, 
        {
            expiresIn: constants.SESSIONS.TOKENS.ACCESS_TOKEN.EXP,
            algorithm: "HS256",
        }
    );

    //Create refresh token
    const refresh_token = jwt.sign(
        {   
            ...payload, 
            type: constants.SESSIONS.TOKENS.REFRESH_TOKEN.NAME,
        }, 
        constants.SESSIONS.TOKENS.SECRET_KEY, 
        {
            expiresIn: constants.SESSIONS.TOKENS.REFRESH_TOKEN.EXP,
            algorithm: "HS256",
        }
    );

    const AuthResponse: IAuthResponse = {
        access_token,
        refresh_token,
    }

    return AuthResponse;
};

const verifyToken = (token: string) => {
    try {
      return jwt.verify( token, constants.SESSIONS.TOKENS.SECRET_KEY ) as IAuthTokenBody;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnAuthorizedError("The token has expired. Please log in again!");
      }
      throw new UnAuthorizedError("You're not authorized to access this resource!");
    }
  };

function generateOTP(length: number = 6) {
    let otp = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}

export default {
    encryptString,
    compareStringWithHash,
    generateTokens,
    verifyToken,
    generateOTP,
}