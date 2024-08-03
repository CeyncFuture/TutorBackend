/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-44m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

class AppError extends Error {
    public statusCode: number;
    public data: {};
  
    constructor(message: string, statusCode: number, data?: {}) {
      
      super(message);
      this.statusCode = statusCode;

      if (data) 
        this.data = data;
      else 
        this.data = {};
    }
}

export default AppError;