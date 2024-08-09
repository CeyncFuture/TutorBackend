/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-23h-14m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Request, Response, NextFunction } from "express";
import { IAuthTokenBody } from "../auth.interface";
import AuthUtil from "../auth.util";
import UnAuthorizedError from "../../errors/classes/UnauthorizedError";
import ForbiddenError from "../../errors/classes/ForbiddenError";
import { errorMessages } from "../../errors/error.const";

const authorizationHandler = async (roles: string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {

        // Extract the Bearer token from the Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
           throw new UnAuthorizedError(errorMessages.UNAUTHORIZED.AUTH_HEADER_NOT_EXIST);
        }

        // Extract the token from the Bearer string
        const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
        if (!token) {
            throw new UnAuthorizedError(errorMessages.UNAUTHORIZED.AUTH_TOKEN_NOT_EXIST);
        }

        // Verify jwt
        const userRole: IAuthTokenBody = AuthUtil.verifyToken(token);

        // Check if the user role is allowed
        if (!roles.includes(userRole.role)) {
            throw new ForbiddenError(errorMessages.FORBIDDEN.NOT_AUTHORIZED_ROLE);
        }

        // Proceed to the next middleware or route handler
        next();
    }
}

export default authorizationHandler;