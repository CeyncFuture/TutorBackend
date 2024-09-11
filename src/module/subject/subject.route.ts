/**
 * author Thilina Pahalagedara
 * created on 24-08-2024-23h-05m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/
import { Router } from 'express';
import SubjectController from './subject.controller';
import AuthorizationHandler from '../auth/middlewares/authorizationHandler';
import { constants } from '../../constants';

const route = Router();

route.get(
    "/",
    AuthorizationHandler([constants.USER_ROLES.ALL]),
    SubjectController.getSubjects
)

route.post(
    "/",
    AuthorizationHandler([constants.USER_ROLES.ADMIN]),
    SubjectController.createSubject
)

export default route;