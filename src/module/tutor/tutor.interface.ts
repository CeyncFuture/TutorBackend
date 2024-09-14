/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-22m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional, Association } from "sequelize";
import { Subject } from "../subject/subject.interface";

interface ITutor {
    id?: number;
    user_id?: number;
    highest_education_qualification: string;
    high_school: string;
    degree: string;
    university: string;
    previous_experience: string;
    exp_confirmation: string;
    // interests: string;
    device: string;
    employment: string;
    work_hours: number;
    expected_earnings: number;
    description?: string;
}

interface ITutorModel extends Optional<ITutor, "id" | "description"> {}

class Tutor extends Model<ITutor, ITutorModel> implements ITutor {
    public id?: number; // Optional
    public user_id?: number; // Optional
    public highest_education_qualification!: string;
    public high_school!: string;
    public degree!: string;
    public university!: string;
    public previous_experience!: string;
    public exp_confirmation!: string;
    // public interests!: string;
    public device!: string;
    public employment!: string;
    public work_hours!: number;
    public expected_earnings!: number;
    public description!: string;

    public getSubjects!: () => Promise<Subject[]>;

    public static associations: {
        subject: Association<Tutor, Subject>;
    };
}


export {
    ITutor,
    ITutorModel,
    Tutor
}