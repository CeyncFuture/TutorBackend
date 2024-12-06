/**
 * author Thilina Pahalagedara
 * created on 12-08-2024-22h-17m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { constants } from "../../../constants";
import NotFoundError from "../../errors/classes/NotFoundError";
import { errorMessages } from "../../errors/error.const";
import subjectService from "../../subject/subject.service";
import { Tutor } from "../../tutor/tutor.interface";
import UserService from "../user.service"

const getUserData = async( userId: number, role: string ) => {
    
    //Find is user exist
    const user = await UserService.findById(userId);
    if(!user)
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    
    const auth = await user.getAuth();
    if(!auth)
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);

    if(role === constants.USER_ROLES.TUTOR){
        const tutor: Tutor = await user.getTutor() as Tutor;
    
        // convert subject response to subject ids
        let subjects: number[] = [];
    
        const dbSubjects = tutor && await subjectService.findAllWithTutor(tutor.id);
        dbSubjects && dbSubjects.forEach((subject)=> {
            subjects.push(subject.id);
        });    
    
        return { 
            user, 
            auth,
            tutor,
            subjects
        };
    }else {
        return { 
            user, 
            auth
        };
    }
}

export default {
    getUserData,
}