/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-15m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Router } from "express";
import AuthRegisterInputSanitizer from "./middlewares/authRegisterInputSanitizer";
import AuthController from "./auth.controller";
import AuthLoginInputSanitizer from "./middlewares/loginInputSanitizer";

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

export default route;