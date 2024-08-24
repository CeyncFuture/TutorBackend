/**
 * author Thilina Pahalagedara
 * created on 17-08-2024-20h-56m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { ITutorModel, Tutor } from "./tutor.interface";

const save = async( tutorModel: ITutorModel,transaction?: Transaction ) => {
    return await Tutor.create(tutorModel,{transaction})
}

const findByUserId = async(userId: number) => {
    return await Tutor.findOne({where: {user_id: userId}})
}

export default {
    save,
    findByUserId,
}