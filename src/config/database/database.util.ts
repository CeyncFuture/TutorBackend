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
import PendingUserSchema from "../../module/pendingUser/pendingUser.model";
import { SubjectCategorySchema, SubjectSchema } from "../../module/subject/subject.model";
import SubjectsTutorsSchema from "../../module/joinTables/subjectsTutors/subjectsTutors.model";

//import models
import { Auth } from "../../module/auth/auth.interface";
import { User } from "../../module/user/user.interface";
import { Student } from "../../module/student/student.interface";
import { Tutor } from "../../module/tutor/tutor.interface";
import { PendingUser } from "../../module/pendingUser/pendingUser.interface";
import { Subject, SubjectCategory } from "../../module/subject/subject.interface";
import { SubjectTutor } from "../../module/joinTables/subjectsTutors/subjectsTutors.interface";

import InternalServerError from "../../module/errors/classes/InternalServerError";



let sequelizeInstance: Sequelize | null = null;

//Add more models
const modelDefiners: typeof AuthSchema[]  = [
    AuthSchema,
    UserSchema,
    StudentSchema,
    TutorSchema,
    PendingUserSchema,
    SubjectSchema,
    SubjectCategorySchema,
    SubjectsTutorsSchema,
];

//Add relations 
const initializeModelRelations = () => {
  //User relations
  Auth.hasOne(User,{
    foreignKey: "auth_id",
  });
  User.belongsTo(Auth, {
    foreignKey: "auth_id",
  });

  User.hasOne(Student,{
    foreignKey: "user_id",
  });
  Student.belongsTo(User,{
    foreignKey: "user_id",
  });

  User.hasOne(Tutor,{
    foreignKey: "user_id",
  });
  Tutor.belongsTo(User,{
    foreignKey: "user_id",
  });

  User.hasOne(PendingUser,{
    foreignKey: "user_id",
  });
  PendingUser.belongsTo(User,{
    foreignKey: "user_id",
  });

  //Subject relations
  SubjectCategory.hasMany(Subject,{
    foreignKey: "category_id",
  });
  Subject.belongsTo(SubjectCategory,{
    foreignKey: "category_id",
  });
  SubjectTutor.belongsTo(Subject,{
    foreignKey: "subject_id",
  });
  Subject.hasMany(SubjectTutor,{
    foreignKey: "subject_id",
  });

  //Tutor relations
  Tutor.hasMany(SubjectTutor,{
    foreignKey: "tutor_id",
  });
  SubjectTutor.belongsTo(Tutor,{
    foreignKey: "tutor_id",
  });

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
    initializeModelRelations();

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
