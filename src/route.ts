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

export default router;