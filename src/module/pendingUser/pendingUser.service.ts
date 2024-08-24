/**
 * author Thilina Pahalagedara
 * created on 09-08-2024-22h-52m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { IPendingUserModel, PendingUser } from "./pendingUser.interface";

const save = async( pendingUserModel: IPendingUserModel, transaction?: Transaction ) => {
    return PendingUser.create(pendingUserModel, {transaction});
}

const findByUserId = async( userId: number ) => {
    return PendingUser.findOne({ where: { user_id: userId } });
}

export default {
    save,
    findByUserId
}