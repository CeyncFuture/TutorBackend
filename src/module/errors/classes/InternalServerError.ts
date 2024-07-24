/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-51m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";

export default class InternalServerError extends AppError{
    constructor(message?: string){
        super(message || "Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}