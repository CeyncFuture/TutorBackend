/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-00h-12m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { IUserModel, User } from "./user.interface";

const save = async( userModel: IUserModel, transaction?: Transaction ) => {
   return await User.create(userModel,{transaction});
}

const findByAuthId = async( auth_id: number ) => {
    return await User.findOne({
        where: {auth_id}
    })
}

const findByPk = async( userId: number ) => {
    return await User.findByPk(userId);
}

export default {
    save,
    findByAuthId,
    findByPk,
}