/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-23h-40m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import express from "express";

const router = express.Router();

//add new routes to here
router.use(
    "/test",
    (req, res) => {
        res.send("test");
    }
);

export default router;