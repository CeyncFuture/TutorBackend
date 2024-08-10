/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-24m
 * github: https://github.com/Pahalagedara
 * copyright 2024
**/

import { IAuth, IAuthRegisterSanitizedInputs } from "../auth.interface";
import DatabaseUtil from "../../../config/database/database.util";
import AuthUtil from "../auth.util";
import AuthService from "../auth.service";
import { errorMessages } from "../../errors/error.const";
import UserService from "../../user/user.service";
import { IUser } from "../../user/user.interface";
import ConflictError from "../../errors/classes/ConflictError";
import { constants } from "../../../constants";



const register = async ( sanitizedInputs: IAuthRegisterSanitizedInputs ) => {
    //Check is email already exist.
    const dbExistAuth = await AuthService.findByEmail(sanitizedInputs.email);
    
    if (dbExistAuth)
        throw new ConflictError(errorMessages.CONFLICT.EMAIL_EXISTS);
    
    //Get transaction instance for roll back the db saving.
    const sequelizeInstance = DatabaseUtil.getSequelizeInstance();
    const transaction = await sequelizeInstance.transaction();

    //Create auth params.
    const authParam: IAuth = {
        role_id: constants.USER_ROLES.ALL,
        email: sanitizedInputs.email,
        password: await AuthUtil.encryptString(sanitizedInputs.password),
        is_verified: false,
    }

    try {
        const dbAuth = await AuthService.save(authParam, transaction);

        const userParam: IUser = {
            auth_id: dbAuth.id,
            first_name: sanitizedInputs.first_name,
            last_name: sanitizedInputs.last_name,
            country_code: sanitizedInputs.country_code,
            phone_number: sanitizedInputs.phone_number,
        }

        const dbUser = await UserService.save(userParam, transaction);
        
        //Save data in database.
        await transaction.commit();
    }catch(err) {

        //Roll back the data saving.
        await transaction.rollback();
        throw err;
    }
};


export default {
    register,
}
