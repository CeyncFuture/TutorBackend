/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-45m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from 'http-status-codes';
import { AppError } from './AppError';

// Represents an error when input validation fails.
export class ValidationError extends AppError {
  constructor(message?: string ) {
    super(message || "Validation failed", StatusCodes.BAD_REQUEST);
  }
}
