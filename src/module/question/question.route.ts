/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-19h-03m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Router } from 'express';
import { constants } from '../../constants';
import commonMiddleware from '../common/common.middleware';
import AuthorizationHandler from "../auth/middlewares/authorizationHandler";
import QuestionInputsSanitizer from './middleware/questionInputsSanitizer';
import QuestionController from './question.controller';

const route = Router();

route.get("/",  AuthorizationHandler([constants.USER_ROLES.ALL]), QuestionController.getQuestions)

route.post(
    "/",
    AuthorizationHandler([constants.USER_ROLES.ALL]), //TODO: student,
    commonMiddleware.fileUpload("attachments",constants.FILE_VALIDATION.IMAGE_MIME_TYPES, 2),
    QuestionInputsSanitizer,
    QuestionController.createQuestion
)

export default route;