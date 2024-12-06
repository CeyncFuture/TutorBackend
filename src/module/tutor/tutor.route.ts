import { Router } from 'express';
import { constants } from '../../constants';
import AuthorizationHandler from "../auth/middlewares/authorizationHandler";
import TutorController from "./tutor.controller";

const route = Router();

route.get("/",  AuthorizationHandler([constants.USER_ROLES.ALL]), TutorController.getTutors)

export default route;