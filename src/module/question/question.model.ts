/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-17h-19m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize";
import { Question, QuestionAttachment } from "./question.interface";
import { constants } from "../../constants";

const QualificationSchema = (sequelize: Sequelize) => {
    Question.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            student_user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.USERS,
                    key: "id",
                },
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.QUESTION,
            tableName: constants.DATABASE.TABLE_NAMES.QUESTIONS,
            timestamps: true,
            underscored: true,
        }
    );

    Question.sync();
};

const QualificationAttachmentSchema = (sequelize: Sequelize) => {
    QuestionAttachment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            question_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.QUESTIONS,
                    key: "id",
                },
            },
            file_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.QUESTION_ATTACHMENT,
            tableName: constants.DATABASE.TABLE_NAMES.QUESTION_ATTACHMENTS,
            timestamps: true,
            underscored: true,
        }
    );

    QuestionAttachment.sync();
}

export {
    QualificationSchema,
    QualificationAttachmentSchema,
}