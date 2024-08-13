/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Association, Model, Optional } from "sequelize";
import { Auth } from "../auth/auth.interface";

interface IUser {
    id?: number;
    auth_id: number;
    first_name: string;
    last_name: string;
    profile_picture?:string;
    country_code?: string;
    phone_number?: string;
}

interface IUserModel extends Optional <IUser, "id" | "country_code" | "phone_number"> {}

class User extends Model<IUser, IUserModel> implements IUser {
    public id!: number;
    public auth_id!: number;
    public first_name!: string;
    public last_name!: string;
    public profile_picture?: string;
    public country_code?: string;
    public phone_number?: string;

    // Define the association properties
    public getAuth!: () => Promise<Auth | null>;
    public static associations: {
        auth: Association<User, Auth>;
    };
} 

interface IUserSanitizedInput{
    first_name: string;
    last_name: string;
    profile_picture?: string;
    country_code?: string;
    phone_number?: string;
}

export {
    User,
    IUser,
    IUserModel,
    IUserSanitizedInput,
}