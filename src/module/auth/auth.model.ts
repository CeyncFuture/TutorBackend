/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-27m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Sequelize, DataTypes } from 'sequelize';
import { constants } from '../../constants';
import { Auth } from './auth.interface';

const AuthSchema = (sequelize: Sequelize) => {
    Auth.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        },
        {
          sequelize,
          modelName: constants.DATABASE.MODEL_NAMES.AUTH,
          tableName: constants.DATABASE.TABLE_NAMES.AUTHS,
          timestamps: true,
        }
      );

      Auth.sync();
}

export default AuthSchema;
