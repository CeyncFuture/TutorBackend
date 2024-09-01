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
            highest_education_qualification: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            high_school: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            degree: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            university: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            previous_experience: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            exp_confirmation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            interests: {
                type: DataTypes.STRING, // Adjust if you want to handle this with a separate table
                allowNull: false,
            },
            device: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            employment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            work_hours: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            expected_earnings: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.TUTOR,
            tableName: constants.DATABASE.TABLE_NAMES.TUTORS,
            timestamps: true,
            underscored: true,
        }
    );

    Tutor.sync();
}

export default TutorSchema;