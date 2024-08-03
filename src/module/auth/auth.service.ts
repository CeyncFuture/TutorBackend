/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-00h-12m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { Auth, IAuthModel } from "./auth.interface";
import { User } from "../user/user.interface";

const save = async (authModel: IAuthModel, transaction?: Transaction) => {
    return Auth.create(authModel, {transaction});
}

const findByEmail = async(email: string) => {
    return Auth.findOne({
        where: { email }
    });
}

export default {
    save,
    findByEmail,
}