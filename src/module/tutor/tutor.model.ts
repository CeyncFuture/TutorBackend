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
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.USERS,
                    key: "id",
                },
                onDelete: "CASCADE"
            },
            degree: {
                type: DataTypes.STRING,
            },
            exp_earnings: {
                type: DataTypes.INTEGER,
            },
            high_school: {
                type: DataTypes.STRING,
            },
            interests: {
                type: DataTypes.STRING, //TODO should be change to get from an other table;
            },
            is_send_uni: {
                type: DataTypes.BOOLEAN,
            },
            work_hours: {
                type: DataTypes.INTEGER,
            },
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