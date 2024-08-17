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
    address?: string;
}

interface IUserModel extends Optional <IUser, "id" | "country_code" | "phone_number" | "address"> {}

class User extends Model<IUser, IUserModel> implements IUser {
    public id!: number;
    public auth_id!: number;
    public first_name!: string;
    public last_name!: string;
    public profile_picture?: string;
    public country_code?: string;
    public phone_number?: string;
    public address?: string;

    // Define the association properties
    public getAuth!: () => Promise<Auth | null>;
    public static associations: {
        auth: Association<User, Auth>;
    };
} 

interface IUserMutationSanitizedInput {
    role: string;
    phone_number: string;
    address: string;
    degree: string;
    exp_earnings: number;
    high_school: string;
    interests: string[];
    is_send_uni: boolean;
    work_hours: number;
}

export {
    User,
    IUser,
    IUserModel,
    IUserMutationSanitizedInput
}