/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-23h-40m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import express from "express";

//import routes
import AuthRouter from "./module/auth/auth.route";
import UserRouter from "./module/user/user.route";
import SubjectRouter from "./module/subject/subject.route";
import QuestionRouter from "./module/question/question.route";
import TutorRouter from "./module/tutor/tutor.route";

const router = express.Router();

//add new routes to here
router.use(
    "/auth",
    AuthRouter
);

router.use(
    "/user",
    UserRouter
)

router.use(
    "/subject",
    SubjectRouter
)

router.use(
    "/question",
    QuestionRouter
)

router.use(
    "/tutor",
    TutorRouter
)

export default router;