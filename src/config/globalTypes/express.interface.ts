/**
 * author Thilina Pahalagedara
 * created on 10-08-2024-23h-03m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { ICustomRequestAuth } from '../../module/auth/auth.interface';

// Extend the Express Request interface
declare module 'express-serve-static-core' {
    interface Request {
        auth?: ICustomRequestAuth; // Replace `any` with a more specific type if possible
    }
}