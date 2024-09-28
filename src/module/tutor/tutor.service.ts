/**
 * author Thilina Pahalagedara
 * created on 17-08-2024-20h-56m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize";
import { ITutorModel, Tutor } from "./tutor.interface";
import {User} from "../user/user.interface";

const save = async( tutorModel: ITutorModel,transaction?: Transaction ) => {
    return await Tutor.create(tutorModel,{transaction})
}

const findByUserId = async(userId: number) => {
    return await Tutor.findOne({where: {user_id: userId}})
}

const findTutors = async() => {
    return Tutor.findAll({include: [{model: User}]});
}

export default {
    save,
    findByUserId,
    findTutors
}