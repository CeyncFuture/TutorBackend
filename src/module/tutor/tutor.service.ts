/**
 * author Thilina Pahalagedara
 * created on 17-08-2024-20h-56m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { ITutorModel, Tutor } from "./tutor.interface";
import { User } from "../user/user.interface";
import { Subject } from "../subject/subject.interface";

const save = async( tutorModel: ITutorModel,transaction?: Transaction ) => {
    return await Tutor.create(tutorModel,{transaction})
}

const findByUserId = async(userId: number) => {
    return await Tutor.findOne({where: {user_id: userId}})
}

const findTutors = async(page: number) => {
    return Tutor.findAll({
        include: [
            {
                model: User
            },
            {
                model: Subject,
                as: "subjects",
                attributes: ['id','category_id','name']
            }
        ],
        limit: 20,
        offset: page * 20
    });
}

export default {
    save,
    findByUserId,
    findTutors
}