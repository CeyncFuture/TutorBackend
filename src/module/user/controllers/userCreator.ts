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
import { IStudent } from "../../student/student.interface";
import { ISubjectTutor } from "../../joinTables/subjectsTutors/subjectsTutors.interface";
import DatabaseUtil from "../../../config/database/database.util";
import TutorService from "../../tutor/tutor.service";
import userService from "../user.service"
import NotFoundError from "../../errors/classes/NotFoundError";
import ConflictError from "../../errors/classes/ConflictError";
import StudentService from "../../student/student.service";

import SubjectsTutorsService from "../../joinTables/subjectsTutors/subjectsTutors.service";

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

    //Check is user already registered
    const dbExistTutor = await TutorService.findByUserId(dbExistUser.id);
    const dbExistStudent = await StudentService.findByUserId(dbExistUser.id);

    if(dbExistTutor || dbExistStudent){
        throw new ConflictError(errorMessages.CONFLICT.USER_EXISTS);
    }
    
    //Do unique changes for every roles
    if( sanitizedInputs.role === constants.USER_ROLES.TUTOR) {

        if( !Array.isArray(sanitizedInputs.interests) || sanitizedInputs.interests?.length < 0 )
            throw new ConflictError(errorMessages.CONFLICT.USER_EXISTS);

        const subjectsTutors: ISubjectTutor[] = (await Promise.all(
            sanitizedInputs.interests.map(async (item) => {
                const exists = await SubjectsTutorsService.findBySubjectId(item);
                if (exists) {
                    return {
                        subject_id: item,
                    };
                }
                return null; // Return null for non-existing subjects
            })
        )).filter(Boolean) as ISubjectTutor[];

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

            subjectsTutors.forEach((item)=>{
                item.tutor_id = dbTutor.id
            })

            let dbSubjects = await SubjectsTutorsService.bulkSave(subjectsTutors, transaction);

            // convert subject response to subject ids
            let subjects: number[] = [];
            
            dbSubjects.forEach((subject)=> {
                subjects.push(subject.subject_id);
            }); 

            await transaction.commit();

            return {
                user: dbExistUser,
                auth: dbExistAuth,
                tutor: dbTutor,
                subjects: subjects
            }
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    //Student business logic
    else if( sanitizedInputs.role === constants.USER_ROLES.STUDENT) {
        
        const student: IStudent = sanitizedInputs as IStudent;

        student.user_id = dbExistUser.id;

        //Get transaction instance for roll back the db saving.
        const sequelizeInstance = DatabaseUtil.getSequelizeInstance();
        const transaction = await sequelizeInstance.transaction();
    
        try{
            //save user table records
            await dbExistUser.save({transaction});
            //save auth table records
            await dbExistAuth.save({transaction});
            //save tutor table records
            const dbStudent = await StudentService.save(student, transaction);

            await transaction.commit();

            return {
            user: dbExistUser,
            auth: dbExistAuth,
            student: dbStudent,
        }
        }catch(err){
            await transaction.rollback();
            throw err;
        }

    }

    return {};
}

export default {
    createUser,
}