/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface IUser {
    id: number;
    name: string;
    role_id: string;
    auth_id: number;
}

interface IUserModel extends Optional <IUser, "id"> {}

class User extends Model<IUser, IUserModel> implements IUser {
    public id!: number;
    public name!: string;
    public role_id!: string;
    public auth_id!: number;
} 

interface IUserInputSanitizer {
    name: string;
    role_id: string;
}

export {
    IUser,
    IUserModel,
    IUserInputSanitizer,
    User
}