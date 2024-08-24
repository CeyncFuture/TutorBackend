/**
 * author Thilina Pahalagedara
 * created on 20-08-2024-21h-39m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface ISubjectTutor {
    id?: number;
    subject_id: number;
    tutor_id: number;
}

interface ISubjectTutorModel extends Optional <ISubjectTutor, "id"> {};

class SubjectTutor extends Model <ISubjectTutor, ISubjectTutorModel> implements ISubjectTutor {
    public id!: number;
    public subject_id!: number;
    public tutor_id!: number;
}

export {
    ISubjectTutor,
    ISubjectTutorModel,
    SubjectTutor,
}