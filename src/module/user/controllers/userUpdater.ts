/**
 * author Thilina Pahalagedara
 * created on 07-09-2024-22h-17m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import databaseUtil from "../../../config/database/database.util";
import { constants } from "../../../constants";
import ForbiddenError from "../../errors/classes/ForbiddenError";
import NotFoundError from "../../errors/classes/NotFoundError";
import { errorMessages } from "../../errors/error.const";
import subjectService from "../../subject/subject.service";
import { ITutor } from "../../tutor/tutor.interface";
import tutorService from "../../tutor/tutor.service";
import { IUser, IUserUpdateSanitizedInput } from "../user.interface";
import userService from "../user.service";

const updateUser = async(userId: number, role: string, sanitizedInputs: IUserUpdateSanitizedInput) => {
    //get exist users table records
    const dbExistUser = await userService.findByPk(userId);

    if(!dbExistUser){
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    //get exist auths table records
    const dbExistAuth = await dbExistUser.getAuth();
    if(!dbExistAuth){
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    }

    if( role==constants.USER_ROLES.TUTOR ) {

        //get exist tutors table records
        const dbExistTutor = await tutorService.findByUserId(dbExistUser.id);
        if(!dbExistTutor){
            throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
        }

        // convert subject response to subject ids
        let subjects: number[] = [];

        const dbSubjects = dbExistTutor && await subjectService.findAllWithTutor(dbExistTutor.id);
        dbSubjects.forEach((subject)=> {
            subjects.push(subject.id);
        });    

        Object.assign(dbExistTutor, sanitizedInputs as ITutor);
        Object.assign(dbExistUser, sanitizedInputs as IUser);

        //Get transaction instance for roll back the db saving.
        const sequelizeInstance = databaseUtil.getSequelizeInstance();
        const transaction = await sequelizeInstance.transaction();

        //remove password from response
        dbExistAuth.password = "";

        try {
            await dbExistUser.save({transaction});
            await dbExistTutor.save({transaction});
            
            //Save data in database.
            await transaction.commit();
            return {
                auth: dbExistAuth,
                tutor: dbExistTutor,
                user: dbExistUser,
                subjects
            }
        }catch(err) {
    
            //Roll back the data saving.
            await transaction.rollback();
            throw err;
        }
    }

    throw new ForbiddenError(errorMessages.FORBIDDEN.NOT_AUTHORIZED_ROLE);

}

export default {
    updateUser
};