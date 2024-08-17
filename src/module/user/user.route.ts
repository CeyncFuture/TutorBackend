import { Router } from "express";
import AuthorizationHandler from "../auth/middlewares/authorizationHandler";
import { constants } from "../../constants";
import UserController from "./user.controller";
import CreateUserSanitizer from "./middlewares/createUserSanitizer";

const route = Router();

route.get(
    '/',
    AuthorizationHandler([constants.USER_ROLES.ALL]),
    UserController.getUser
)

route.post(
    '/',
    AuthorizationHandler([constants.USER_ROLES.ALL]),
    CreateUserSanitizer,
    UserController.createUser
)


export default route;