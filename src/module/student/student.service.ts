/**
 * author Thilina Pahalagedara
 * created on 01-09-2024-23h-41m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { IStudentModel, Student } from "./student.interface";

const save = async(studentModel: IStudentModel, transaction?: Transaction) => {
    return await Student.create(studentModel,{transaction});
}

const findByUserId = async(userId: number) => {
    return await Student.findOne({where: {user_id: userId}})
}

export default {
    save,
    findByUserId,
}