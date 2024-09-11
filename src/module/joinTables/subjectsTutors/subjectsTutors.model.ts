/**
 * author Thilina Pahalagedara
 * created on 20-08-2024-21h-40m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { DataTypes, Sequelize } from "sequelize";
import { SubjectTutor } from "./subjectsTutors.interface";
import { constants } from "../../../constants";

const SubjectTutorSchema = (sequelize: Sequelize) => {
    SubjectTutor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            subject_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.SUBJECTS,
                    key: 'id',
                },
            },
            tutor_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: constants.DATABASE.TABLE_NAMES.TUTORS,
                    key: 'id',
                },
            }
        },
        {
            sequelize,
            modelName: constants.DATABASE.MODEL_NAMES.SUBJECT_TUTOR,
            tableName: constants.DATABASE.TABLE_NAMES.SUBJECTS_TUTORS,
            timestamps: true,
            underscored: true,
        }
    );

    SubjectTutor.sync();
}

export default SubjectTutorSchema