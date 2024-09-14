/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-23h-27m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { constants } from "../../../constants";
import { errorMessages } from "../../errors/error.const";
import { IPendingUser } from "../../pendingUser/pendingUser.interface";
import AuthUtil from "../auth.util";
import EmailUtil from "../../../config/alert/email/email.util";
import PendingUserService from "../../pendingUser/pendingUser.service"
import UserService from "../../user/user.service";
import AuthService from "../auth.service";
import ForbiddenError from "../../errors/classes/ForbiddenError";
import NotFoundError from "../../errors/classes/NotFoundError";


const requestOTP = async (userId: number) => {
    const dbExistUser = await UserService.findById(userId);
    if (!dbExistUser) {
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    const dbExistAuth = await dbExistUser.getAuth();
    if (!dbExistAuth) {
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    if(dbExistAuth.is_verified){
        throw new ForbiddenError(errorMessages.FORBIDDEN.USER_ALREADY_VERIFIED);
    }

    // Retrieve the pending user record from the database
    let dbPendingUser = await PendingUserService.findByUserId(userId);
    
    // If the user record does not exist, create a new one
    if (!dbPendingUser) {
        dbPendingUser = await PendingUserService.save({
            user_id: userId,
            requested_at: new Date(Date.now() - (constants.SESSIONS.COOLDOWN_TIME * 1000)), // Initialize with a time in the past
            expires_at: new Date(Date.now()),
            otp: "",
            attempt_count: 0,
        } as IPendingUser);

    }

    const now = Date.now();
    const requestedAt = new Date(dbPendingUser.requested_at).getTime();
    const timeGap = (now - requestedAt)/1000;

    // Check if the cooldown period has passed
    if (timeGap < constants.SESSIONS.COOLDOWN_TIME) {
        throw new ForbiddenError(errorMessages.FORBIDDEN.COOL_DOWN_OTP_REQUEST);
    }

    // Handle retry count and cooldown
    if (dbPendingUser.attempt_count > constants.SESSIONS.MAXIMUM_RETRY) {
        if (timeGap < constants.SESSIONS.BLOCKED_COOL_DOWN_TIME) {
            throw new ForbiddenError(errorMessages.FORBIDDEN.TEMPORARILY_BLOCKED_OTP_REQUEST);
        } else {
            // Reset attempt count after cooldown period
            dbPendingUser.attempt_count = 0;
        }
    }

    // Generate new OTP
    const otp = AuthUtil.generateOTP();

    // Send OTP based on the environment
    if (constants.SERVER.ENV === constants.ENV.PRODUCTION || constants.SERVER.ENV === constants.ENV.TEST) {
        // Implement email send
        await EmailUtil.sendOTPViaEmail(dbExistAuth.email, dbExistUser.first_name ,otp);
    } else {
        // Log OTP for non-production environments
        console.log(`OTP for user ${userId} is ${otp}`);
    }

    // Assign new values and save
    dbPendingUser.expires_at = new Date(now + (constants.SESSIONS.VALID_TIME * 1000)); //convert to second 
    dbPendingUser.requested_at = new Date(Date.now());
    dbPendingUser.attempt_count++;
    dbPendingUser.otp = otp;

    await dbPendingUser.save();

    if (constants.SERVER.ENV === constants.ENV.DEVELOPMENT) {
        return (`OTP for user ${userId} is ${otp}`);
    }
};

const verifyOTP = async( userId: number, otp: string ) => {
    //check is user in pending user table
    const dbPendingUser = await PendingUserService.findByUserId(userId);
    if(!dbPendingUser){
        throw new NotFoundError(errorMessages.NOT_FOUND.PENDING_USER_NOT_EXIST);
    }

    //check otp is correct
    if(dbPendingUser.otp !== otp){
        throw new ForbiddenError(errorMessages.FORBIDDEN.INVALID_OTP);
    }

    //check if otp is expired
    const now = Date.now();
    const expiredAt = new Date(dbPendingUser.expires_at).getTime();
    const timeGap = expiredAt - now;

    if(timeGap < 0){
        throw new ForbiddenError(errorMessages.FORBIDDEN.EXPIRED_OTP);
    }

    //update user is_verified to true
    const dbUser = await UserService.findByPk(userId);
    if(!dbUser){
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    const dbAuth = await AuthService.findByPk(dbUser.auth_id);
    if(!dbAuth){
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    dbAuth.is_verified = true;
    await dbAuth.save();

    //delete user from pending user table
    await dbPendingUser.destroy();

}

export default {
    requestOTP,
    verifyOTP
}