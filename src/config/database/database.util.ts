/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-18h-57m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */
import { IDbConnection } from "./database.interface";
import { Sequelize } from "sequelize";

//import models schema
import AuthSchema from "../../module/auth/auth.model";
import UserSchema from "../../module/user/user.model";
import StudentSchema from "../../module/student/student.model";
import TutorSchema from "../../module/tutor/tutor.model";

//import models
import { Auth } from "../../module/auth/auth.interface";
import { User } from "../../module/user/user.interface";
import { Student } from "../../module/student/student.interface";
import { Tutor } from "../../module/tutor/tutor.interface";
import InternalServerError from "../../module/errors/classes/InternalServerError";

let sequelizeInstance: Sequelize | null = null;

//Add more models
const modelDefiners: typeof AuthSchema[]  = [
    AuthSchema,
    UserSchema,
    StudentSchema,
    TutorSchema
];

//Add relations 
const initializeModelRelations = (sequelize: Sequelize) => {
  Auth.hasOne(User);
  User.belongsTo(Auth);
  User.hasOne(Student);
  Student.belongsTo(User);
  User.hasOne(Tutor);
  Tutor.belongsTo(User);
}

const connectDB = async (connection: IDbConnection) => {
  try {
    const sequelize = new Sequelize(
      connection.database,
      connection.username,
      connection.password,
      {
        host: connection.host,
        port: connection.port,
        dialect: "mysql",
        // logging: console.log,
      }
    );

    await sequelize.authenticate();

    //Sync database models
    modelDefiners.map( async(modelDefiner) => {
       modelDefiner(sequelize);
    })

    //initiate model relations
    initializeModelRelations(sequelize);

    await sequelize.sync();

    sequelizeInstance = sequelize;

    console.log("Database connection OK!");
  } catch (error: any) {
    console.log(error)
    console.log("Unable to connect to the database:");
  }
};

const getSequelizeInstance = () => {

  if (!sequelizeInstance) {
    console.log("Sequelize instance not found. Did you forget to call connectDB?");
    throw new InternalServerError("Database does not work properly.");
  }

  return sequelizeInstance;
}

export default {
  connectDB,
  getSequelizeInstance
};
