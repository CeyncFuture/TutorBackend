/**
 * author Thilina Pahalagedara
 * created on 17-08-2024-19h-48m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { errorMessages } from "../../errors/error.const";
import { constants } from "../../../constants";
import { ITutor } from "../../tutor/tutor.interface";
import { IUserMutationSanitizedInput } from "../user.interface"
import DatabaseUtil from "../../../config/database/database.util";
import TutorService from "../../tutor/tutor.service";
import userService from "../user.service"
import NotFoundError from "../../errors/classes/NotFoundError";
import ConflictError from "../../errors/classes/ConflictError";

const createUser = async( userId: number, sanitizedInputs: IUserMutationSanitizedInput ) => {
    //get exist user table records
    const dbExistUser = await userService.findByPk(userId);

    if(!dbExistUser){
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    dbExistUser.phone_number = sanitizedInputs.phone_number;
    dbExistUser.address = sanitizedInputs.address;

    //get exist auth table records
    const dbExistAuth = await dbExistUser.getAuth();

    if(!dbExistAuth){
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    dbExistAuth.role_id = sanitizedInputs.role;
    
    //Do unique changes for every roles
    if( sanitizedInputs.role === constants.USER_ROLES.TUTOR) {

        const dbExistTutor = await TutorService.findByUserId(dbExistUser.id);

        if(dbExistTutor){
            throw new ConflictError(errorMessages.CONFLICT.USER_EXISTS);
        }

        let tutor: ITutor = {
            ...sanitizedInputs,
            interests: JSON.stringify(sanitizedInputs.interests)
        } as ITutor;

        tutor.user_id = dbExistUser.id;
    
        //Get transaction instance for roll back the db saving.
        const sequelizeInstance = DatabaseUtil.getSequelizeInstance();
        const transaction = await sequelizeInstance.transaction();
    
        try{
            //save user table records
            await dbExistUser.save({transaction});
            //save auth table records
            await dbExistAuth.save({transaction});
            //save tutor table records
            const dbTutor = await TutorService.save(tutor, transaction);

            await transaction.commit();

            return {
                user: dbExistUser,
                auth: dbExistAuth,
                tutor: dbTutor,
            }
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    else if( sanitizedInputs.role === constants.USER_ROLES.STUDENT) {
        return {
            user: dbExistUser,
        }
    }

    return {};
}

export default {
    createUser,
}