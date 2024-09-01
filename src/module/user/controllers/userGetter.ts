/**
 * author Thilina Pahalagedara
 * created on 12-08-2024-22h-17m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import NotFoundError from "../../errors/classes/NotFoundError";
import { errorMessages } from "../../errors/error.const";
import UserService from "../user.service"

const getUserData = async( userId: number ) => {
    
    //Find is user exist
    const user = await UserService.findById(userId);
    if(!user)
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);
    
    const auth = await user.getAuth();
    if(!auth)
        throw new NotFoundError(errorMessages.NOT_FOUND.USER_NOT_EXIST);

    const tutor = await user.getTutor();

    return { 
        user, 
        auth,
        tutor
    };
}

export default {
    getUserData,
}