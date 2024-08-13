import { Router } from "express";
import authorizationHandler from "../auth/middlewares/authorizationHandler";
import { constants } from "../../constants";
import UserController from "./user.controller";

const route = Router();

route.get(
    '/',
    authorizationHandler([constants.USER_ROLES.ALL]),
    UserController.getUser
)


export default route;