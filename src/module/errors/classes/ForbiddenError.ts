/**
 * author Thilina Pahalagedara
 * created on 09-08-2024-21h-51m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/


import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";

class ForbiddenError extends AppError{
    constructor(message: string, data?: {}) {
        super(message, StatusCodes.FORBIDDEN, data);
      }
}

export default ForbiddenError;