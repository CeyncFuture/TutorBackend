/**
 * author Thilina Pahalagedara
 * created on 02-08-2024-22h-24m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { errorMessages } from "../../errors/error.const";
import { IAuthResponse, IAuthTokenBody, ILoginSanitizedInputs } from "../auth.interface";
import AuthUtil from "../auth.util";
import UserService from "../../user/user.service";
import AuthService from "../auth.service";
import BadRequestError from "../../errors/classes/BadRequestError";
import subjectService from "../../subject/subject.service";

const login = async( sanitizedInputs: ILoginSanitizedInputs ) => {

    //Check email has exist account.
    const dbExistAuth = await AuthService.findByEmail(sanitizedInputs.email);
    if (!dbExistAuth)
        throw new BadRequestError(errorMessages.BAD_REQUEST.EMAIL_NOT_EXISTS);

    //Check password is correct.
    const isPasswordCorrect = await AuthUtil.compareStringWithHash(sanitizedInputs.password, dbExistAuth.password);
    if(!isPasswordCorrect)
        throw new BadRequestError(errorMessages.BAD_REQUEST.WRONG_PASSWORD);

    //Retrieve user data
    const dbExistUser = await UserService.findByAuthId(dbExistAuth.id);
    if(!dbExistUser)
        throw new BadRequestError(errorMessages.BAD_REQUEST.EMAIL_NOT_EXISTS);

    const authTokenBodyParam: IAuthTokenBody = {
        user_id: dbExistUser.id,
        role: dbExistAuth.role_id,
    }

    //If tutor set value
    const dbExistTutor = await dbExistUser.getTutor();
    const dbSubjects = dbExistTutor && await subjectService.findAllWithTutor(dbExistTutor.id);
    const subjects: number[] = [];
    dbSubjects && dbSubjects.forEach((subject)=> {
        subjects.push(subject.id);
    });  
    
    return {
        token: AuthUtil.generateTokens(authTokenBodyParam) as IAuthResponse,
        user: dbExistUser,
        auth: dbExistAuth,
        tutor: dbExistTutor,
        subjects
    }

}

export default {
    login,
}