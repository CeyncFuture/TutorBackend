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
    expected_earnings: number;
    highest_education_qualification: string;
    high_school: string;
    interests: string;
    is_send_uni: boolean;
    work_hours: number;
    device: string;
    employment: string;
    previous_experience: string;
}

interface ITutorModel extends Optional<ITutor, "id"> {}

class Tutor extends Model<ITutor, ITutorModel> implements ITutor {
    public id?: number; // Optional
    public user_id?: number; // Optional
    public degree!: string;
    public expected_earnings!: number;
    public highest_education_qualification!: string;
    public high_school!: string;
    public interests!: string;
    public is_send_uni!: boolean;
    public work_hours!: number;
    public device!: string;
    public employment!: string;
    public previous_experience!: string;
}


export {
    ITutor,
    ITutorModel,
    Tutor
}