/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-15m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Router } from "express";
import { constants } from "../../constants";
import AuthController from "./auth.controller";
import AuthRegisterInputSanitizer from "./middlewares/authRegisterInputSanitizer";
import AuthLoginInputSanitizer from "./middlewares/loginInputSanitizer";
import AuthorizationHandler from "./middlewares/authorizationHandler";
import OTPVerifyInputSanitizer from "./middlewares/otpVerifyInputSanitizer";

const route = Router();

route.post(
    "/register",
    AuthRegisterInputSanitizer,
    AuthController.authRegister
);

route.post(
    "/login",
    AuthLoginInputSanitizer,
    AuthController.userLogin
)

route.get(
    "/logout",
    AuthController.userLogout,
)

route.post(
    "/otp",
    AuthorizationHandler([constants.USER_ROLES.ALL]),
    AuthController.getOTP,
)

route.post(
    "/otp-verify",
    AuthorizationHandler([constants.USER_ROLES.ALL]),
    OTPVerifyInputSanitizer,
    AuthController.verifyOTP,
)

export default route;