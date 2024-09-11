/**
 * author Thilina Pahalagedara
 * created on 20-08-2024-08h-31m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize";
import { Subject, SubjectCategory } from "./subject.interface";
import { constants } from "../../constants";

const SubjectSchema = (sequelize: Sequelize) => {
    Subject.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.SUBJECT_CATEGORIES,
                    key: 'id'
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.SUBJECT,
            tableName: constants.DATABASE.TABLE_NAMES.SUBJECTS,
            timestamps: true,
            underscored: true,
        }
    );

    Subject.sync();
};

const SubjectCategorySchema = (sequelize: Sequelize) => {
    SubjectCategory.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.SUBJECT_CATEGORY,
            tableName: constants.DATABASE.TABLE_NAMES.SUBJECT_CATEGORIES,
            timestamps: true,
            underscored: true,
        }
    );

    SubjectCategory.sync();
};

export {
    SubjectSchema,
    SubjectCategorySchema
}

