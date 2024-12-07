import { Router } from "express";
import { constants } from "../../constants";
import UserController from "./user.controller";
import AuthorizationHandler from "../auth/middlewares/authorizationHandler";
import CreateUserSanitizer from "./middlewares/createUserSanitizer";
import UpdateUserSanitizer from "./middlewares/updateUserSanitizer ";

const route = Router();

route.get(
    '/admin/:sharableId',
    UserController.getAdminDetails
)

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

route.put(
    "/",
    AuthorizationHandler([constants.USER_ROLES.ALL]),
    UpdateUserSanitizer,
    UserController.updateUser
)


export default route;