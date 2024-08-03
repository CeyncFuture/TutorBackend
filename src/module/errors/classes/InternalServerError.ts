/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-51m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";

class InternalServerError extends AppError{
    constructor(message: string){
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default InternalServerError;