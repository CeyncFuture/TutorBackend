/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Association, Model, Optional } from "sequelize";
import { Auth } from "../auth/auth.interface";
import { Tutor } from "../tutor/tutor.interface";

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
    public getTutor!: () => Promise<Tutor | null>;

    public static associations: {
        auth: Association<User, Auth>;
        tutor: Association<User, Tutor>;
    };
} 

interface IUserMutationSanitizedInput {
    role: string;
    phone_number: string;
    address: string;
    
    /*Tutor data*/
    highest_education_qualification?: string;
    high_school?: string;
    degree?: string;
    university?: string;
    previous_experience?: string;
    exp_confirmation?: string;
    interests?: number[];
    device?: string;
    employment?: string;
    work_hours?: number;
    expected_earnings?: number;
    description?: string

    /*Student data */
}

interface IUserUpdateSanitizedInput {
    first_name: string;
    last_name: string;
    phone_number?: string;
    address?: string;
    profile_picture?: string;

    /*Tutor data*/
    highest_education_qualification?: string;
    high_school?: string;
    degree?: string;
    university?: string;
    previous_experience?: string;
    exp_confirmation?: string;
    device?: string;
    employment?: string;
    work_hours?: number;
    expected_earnings?: number;
    description?: string

    /*Student data */
}

export {
    User,
    IUser,
    IUserModel,
    IUserMutationSanitizedInput,
    IUserUpdateSanitizedInput
}