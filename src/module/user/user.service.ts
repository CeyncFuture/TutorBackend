/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-00h-12m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { IUserModel, User } from "./user.interface";
import { Auth } from "../auth/auth.interface";

const save = async( userModel: IUserModel, transaction?: Transaction ) => {
   return await User.create(userModel,{transaction});
}

const findByAuthId = async( auth_id: number ) => {
    return await User.findOne({
        where: {auth_id}
    })
}

const findByPk = async( userId: number ) => {
    return await User.findByPk(userId,{
        include: [
            { 
                model: Auth,
                required: true,
            }
        ]
    });
}

const findById = async( userId: number ) => {
    return await User.findOne({
        where: {id: userId},
        include: [
            {
                model: Auth,
                required: true,
            },
        ]
    });
};

const findByAdminId = async ( sharableId: number) => {
    console.log(sharableId)
    return await User.findOne({
        where: {sharable_id: sharableId},
    })
}

export default {
    save,
    findByAuthId,
    findByPk,
    findById,
    findByAdminId,
}