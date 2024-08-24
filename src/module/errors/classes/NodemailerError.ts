/**
 * author Thilina Pahalagedara
 * created on 18-08-2024-03h-36m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { StatusCodes } from 'http-status-codes';
import AppError from './AppError';

// Represents an error when a user is not authorized to access a resource.
class NodeMailerError extends AppError {
  public responseCode: number;
  public command: string;
  public response: string;

  constructor(message: string, responseCode: number, response: string, command: string) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = 'EmailSyntaxError';
    this.responseCode = responseCode;
    this.response = response
    this.command = command;
  }
}

export default NodeMailerError;