/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize";
import { Tutor } from "./tutor.interface";
import { constants } from "../../constants";

const TutorSchema = async(sequelize: Sequelize) => {
    Tutor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.USERS,
                    key: "id",
                }
            }
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.TUTOR,
            tableName: constants.DATABASE.TABLE_NAMES.TUTORS,
        }
    );

    Tutor.sync();
}

export default TutorSchema;