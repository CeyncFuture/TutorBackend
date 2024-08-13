/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize";
import { User } from "./user.interface";
import { constants } from "../../constants";

const UserSchema = async(sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            auth_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.AUTHS,
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profile_picture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.USER,
            tableName: constants.DATABASE.TABLE_NAMES.USERS,
            timestamps: true
        }
    );

    User.sync();
}

export default UserSchema;