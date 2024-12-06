/**
 * author Thilina Pahalagedara
 * created on 20-08-2024-08h-36m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { ISubjectCategoryModel, ISubjectModel, Subject, SubjectCategory } from "./subject.interface";
import { Tutor } from "../tutor/tutor.interface";

const saveSubject = async(subject: ISubjectModel, transaction?: Transaction) => {
    return Subject.create(subject, {transaction});
}

const saveCategory = async(category: ISubjectCategoryModel, transaction?: Transaction) => {
    return SubjectCategory.create(category, {transaction});
}

// const findAll = async() => {
//     return Subject.findAll({
//         attributes: ["id","name"],
//         include: [
//             {
//                 model: SubjectCategory,
//                 required: true,
//                 attributes: ["name"]
//             }
//         ]
//     });
// }

const findAll = async() => {
    return SubjectCategory.findAll({
        attributes: ["id","name"],
        include: [
            {
                model: Subject,
                required: true,
                attributes: ["id","name"]
            }
        ]
    });
}

const findAllWithTutor = async(tutorId?: number) => {
    return await Subject.findAll({
        attributes: ["id","name"],
        include: [
            // {
            //     model: SubjectCategory,
            //     required: true,
            //     attributes: ["name"]
            // },
            {
                model: Tutor,
                attributes: ["id"],
                ... tutorId && {where: { id: tutorId }}
            }
        ]
    })
}

const findCategoryByName = async(name: string) => {
    return SubjectCategory.findOne({where: {name}});
}

export default {
    saveSubject,
    saveCategory,
    findAll,
    findCategoryByName,
    findAllWithTutor,
}