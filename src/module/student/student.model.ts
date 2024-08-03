/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-22m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize"
import { Student } from "./student.interface"
import { constants } from "../../constants"

const StudentSchema = (sequelize: Sequelize) => {
    Student.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.USERS,
                    key: "id"
                },
                onDelete: "CASCADE"
            }
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.STUDENT,
            tableName: constants.DATABASE.TABLE_NAMES.STUDENTS,
            timestamps: false
        }
    );

    Student.sync();
}

export default StudentSchema;