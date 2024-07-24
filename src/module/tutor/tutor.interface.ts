/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-22m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface ITutor {
    id: number;
    description?: string;
    user_id: number;
}

interface ITutorModel extends Optional <ITutor, "id" | "description"> {}

class Tutor extends Model<ITutor, ITutorModel> implements ITutor {
    public id!: number;
    public description!: string;
    public user_id!: number;
} 

interface ITutorInputSanitizer {
    description?: string;
}

export {
    ITutor,
    ITutorModel,
    ITutorInputSanitizer,
    Tutor
}