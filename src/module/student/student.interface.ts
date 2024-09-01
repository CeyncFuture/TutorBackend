/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-21h-23m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */

import { Model, Optional } from "sequelize";

interface IStudent {
  id?: number;
  user_id?: number;
  description?: string;
}

interface IStudentModel extends Optional< IStudent, "id" | "description" > {}

class Student extends Model<IStudent, IStudentModel> implements IStudent {
  public id!: number;
  public description!: string;
  public user_id!: number;
}

interface IStudentSanitizedInputs {
  description?: string;
}

export { IStudent, IStudentModel, Student, IStudentSanitizedInputs };
