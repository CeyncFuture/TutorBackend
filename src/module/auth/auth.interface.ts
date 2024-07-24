/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */

import { Model, Optional } from "sequelize";

interface IError {
  statusCode: number;
  message: string;
  data: any
}

interface IAuth {
  id: number;
  email: string;
  password: string;
}

interface IAuthModel extends Optional<IAuth, "id"> {}

class Auth extends Model<IAuth, IAuthModel> implements IAuth {
  public id!: number;
  public email!: string;
  public password!: string;
}

interface IAuthSanitizedInputs {
  name: string;
  email: string;
  password?: string;
}

export { IError, IAuth, IAuthModel, IAuthSanitizedInputs, Auth };
