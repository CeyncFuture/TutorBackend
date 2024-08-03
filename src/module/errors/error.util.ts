/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-14h-34m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import Joi from "joi";
import DataValidationError, { TKeyValuePair } from "./classes/ValidationError";

const throwValidationError = (errorDetails: Array<Joi.ValidationErrorItem>) => {

    const errKeyValuePairs: TKeyValuePair = [];
        
    for (const errDetail of errorDetails) {
      const key = errDetail.path.join(".");
      const message = errDetail.message;
  
      errKeyValuePairs.push({
        key,
        message,
      });
    }    

    throw new DataValidationError(errKeyValuePairs);
}

export default {
    throwValidationError
}