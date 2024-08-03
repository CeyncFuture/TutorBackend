/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-15h-00m
 * github: https://github.com/Pahalagedara
 * copyright 2024
**/

import { IStringDictionary } from "../error.interface";
import AppError from "./AppError";
import { StatusCodes } from "http-status-codes";

export type TKeyValuePair = Array<{ key: string; message: string | number }>;

class DataValidationError extends AppError {

    constructor(keyValuePairs: TKeyValuePair) {
        
        let validatorKeyValuePairs: IStringDictionary = {};

        for (const errorPair of keyValuePairs) {
            validatorKeyValuePairs[errorPair.key] = errorPair.message;
        }

        super("Data validation error", StatusCodes.BAD_REQUEST, validatorKeyValuePairs);
    }
}

export default DataValidationError;