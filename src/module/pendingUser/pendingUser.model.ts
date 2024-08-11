/**
 * author Thilina Pahalagedara
 * created on 09-08-2024-22h-51m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize";
import { PendingUser } from "./pendingUser.interface";
import { constants } from "../../constants";

const pendingUserSchema = (sequelize: Sequelize) => {
    PendingUser.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.USERS,
                    key: 'id'
                }
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            requested_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            attempt_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        },
        {
            sequelize,
            tableName: constants.DATABASE.TABLE_NAMES.PENDING_USERS,
            modelName: constants.DATABASE.TABLE_NAMES.PENDING_USERS,
            timestamps: true
        }
    );

    PendingUser.sync();
}

export default pendingUserSchema;