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
    highest_education_qualification: string;
    high_school: string;
    degree: string;
    university: string;
    previous_experience: string;
    exp_confirmation: string;
    interests: string;
    device: string;
    employment: string;
    work_hours: number;
    expected_earnings: number;
}

interface ITutorModel extends Optional<ITutor, "id"> {}

class Tutor extends Model<ITutor, ITutorModel> implements ITutor {
    public id?: number; // Optional
    public user_id?: number; // Optional
    public highest_education_qualification!: string;
    public high_school!: string;
    public degree!: string;
    public university!: string;
    public previous_experience!: string;
    public exp_confirmation!: string;
    public interests!: string;
    public device!: string;
    public employment!: string;
    public work_hours!: number;
    public expected_earnings!: number;
}


export {
    ITutor,
    ITutorModel,
    Tutor
}