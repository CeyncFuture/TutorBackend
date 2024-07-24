/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-44m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

export class AppError extends Error {
    public readonly statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Set the prototype explicitly to make instanceof checks work correctly
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }