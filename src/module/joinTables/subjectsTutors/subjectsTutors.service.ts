/**
 * author Thilina Pahalagedara
 * created on 02-09-2024-00h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { ISubjectTutorModel, SubjectTutor } from "./subjectsTutors.interface";


const bulkSave = async(subjectTutors: ISubjectTutorModel[], transaction?: Transaction) => {
    return await SubjectTutor.bulkCreate(subjectTutors,{transaction})
}

const findBySubjectId = async(subjectId: number) => {
    return await SubjectTutor.findAll({where: {subject_id: subjectId}})
}

export default {
    bulkSave,
    findBySubjectId
}