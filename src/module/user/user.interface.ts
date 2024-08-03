/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface IUser {
    id?: number;
    auth_id: number;
    first_name: string;
    last_name: string;
    country_code?: string;
    phone_number?: string;
}

interface IUserModel extends Optional <IUser, "id" | "country_code" | "phone_number"> {}

class User extends Model<IUser, IUserModel> implements IUser {
    public id!: number;
    public auth_id!: number;
    public first_name!: string;
    public last_name!: string;
    public country_code?: string;
    public phone_number?: string;
} 

interface IUserSanitizedInput{
    first_name: string;
    last_name: string;
    country_code?: string;
    phone_number?: string;
}

export {
    User,
    IUser,
    IUserModel,
    IUserSanitizedInput,
}