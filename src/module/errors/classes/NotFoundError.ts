/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-45m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

// Represents an error when a requested resource is not found
class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;