/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */

import { Model, Optional } from "sequelize";



interface IAuth {
  id?: number;
  role_id: string;
  email: string;
  password: string;
  is_verified: boolean;
}

interface IAuthModel extends Optional<IAuth, "id" | "role_id"> {}

class Auth extends Model<IAuth, IAuthModel> implements IAuth {
  public id!: number;
  public role_id!: string;
  public email!: string;
  public password!: string;
  public is_verified!: boolean;
}

interface ILoginSanitizedInputs {
  email: string;
  password: string;
}

interface IAuthRegisterSanitizedInputs {
  first_name: string,
  last_name: string,
  email: string,
  country_code: string;
  phone_number?: string;
  password: string,
}

interface IAuthTokenBody {
  user_id: number;
  role: string;
  type?: string;
}

interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    role: string;
    name: string;
    is_verified: boolean;
  }
}

export {
  Auth, 
  IAuth, 
  IAuthModel, 
  ILoginSanitizedInputs, 
  IAuthRegisterSanitizedInputs,
  IAuthTokenBody,
  IAuthResponse,
};
