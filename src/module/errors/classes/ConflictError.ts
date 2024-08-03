/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-23h-34m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

// Represents an error when a requested resource is not found
class ConflictError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

export default ConflictError;