/**
 * author Thilina Pahalagedara
 * created on 20-08-2024-08h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional, Association } from "sequelize";

interface ISubject {
    id?: number;
    category_id: number;
    name: string;
};

interface ISubjectModel extends Optional<ISubject, "id"> {};

class Subject extends Model <ISubjectModel, ISubject> implements ISubject {
    public id!: number;
    public category_id!: number;
    public name!: string;

    public getCategory!: () => Promise<SubjectCategory>;

    public static associations: {
      category: Association<Subject, SubjectCategory>;
    };
}

interface ISubjectCategory {
    id?: number;
    name: string;
}

interface ISubjectCategoryModel extends Optional <ISubjectCategory, "id"> {};

class SubjectCategory extends Model <ISubjectCategoryModel, ISubjectCategory> implements ISubject {
    public id!: number;
    public category_id!: number;
    public name!: string;
}

interface ISubjectCreationInputSanitizer {
    subject_name: string;
    category_name: string;
}

export {
    Subject,
    ISubject,
    ISubjectModel,
    SubjectCategory,
    ISubjectCategory,
    ISubjectCategoryModel,
    ISubjectCreationInputSanitizer
}