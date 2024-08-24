/**
 * author Thilina Pahalagedara
 * created on 20-08-2024-08h-36m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { ISubjectCategoryModel, ISubjectModel, Subject, SubjectCategory } from "./subject.interface";

const saveSubject = (subject: ISubjectModel, transaction?: Transaction) => {
    return Subject.create(subject, {transaction});
}

const saveCategory = (category: ISubjectCategoryModel, transaction?: Transaction) => {
    return SubjectCategory.create(category, {transaction});
}

const findAll = () => {
    return Subject.findAll({
        attributes: ["id","name"],
        include: [
            {
                model: SubjectCategory,
                required: true,
                attributes: ["name"]
            }
        ]
    });
}

const findCategoryByName = (name: string) => {
    return SubjectCategory.findOne({where: {name}});
}

export default {
    saveSubject,
    saveCategory,
    findAll,
    findCategoryByName,
}