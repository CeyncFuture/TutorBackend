/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-00h-46m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";

class BadRequestError extends AppError{
    constructor(message: string, data?: {}) {
        super(message, StatusCodes.BAD_REQUEST, data);
      }
}

export default BadRequestError;