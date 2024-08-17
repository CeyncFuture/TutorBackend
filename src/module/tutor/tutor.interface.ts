/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-22m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface ITutor {
    id?: number;
    user_id?: number;
    degree: string;
    exp_earnings: number;
    high_school: string;
    interests: string;
    is_send_uni: boolean;
    work_hours: number;
}

interface ITutorModel extends Optional <ITutor, "id" > {}

class Tutor extends Model<ITutor, ITutorModel> implements ITutor {
    public id!: number;
    public user_id!: number;
    public degree!: string;
    public exp_earnings!: number;
    public high_school!: string;
    public interests!: string;
    public is_send_uni!: boolean;
    public work_hours!: number;
} 


export {
    ITutor,
    ITutorModel,
    Tutor
}