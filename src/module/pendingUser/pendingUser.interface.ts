/**
 * author Thilina Pahalagedara
 * created on 09-08-2024-22h-52m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface IPendingUser {
    id?: number;
    user_id: number;
    otp: string;
    requested_at: Date;
    expires_at: Date;
    attempt_count: number;
};

interface IPendingUserModel extends Optional<IPendingUser, "id">{};

class PendingUser extends Model<IPendingUserModel, IPendingUser> implements IPendingUser {
    public id?: number;
    public user_id!: number;
    public otp!: string;
    public requested_at!: Date;
    public expires_at!: Date;
    public attempt_count!: number;
}

export {
    PendingUser,
    IPendingUser,
    IPendingUserModel,
}