/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-18h-57m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */
import { IDbConnection } from "./database.interface";
import { Sequelize } from "sequelize";

//import models
import AuthSchema from "../../module/auth/auth.model";


//Add more models
const modelDefiners: typeof AuthSchema[]  = [
    AuthSchema
];

//Add relations 
const initializeModelRelations = (sequelize: Sequelize) => {

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
      }
    );

    await sequelize.authenticate();

    //Sync database models
    for (const modelDefiner of modelDefiners) {
      modelDefiner(sequelize);
    }

    //initiate model relations
    initializeModelRelations(sequelize);

    console.log("Database connection OK!");
  } catch (error: any) {
    console.log("Unable to connect to the database:");
  }
};

export default {
  connectDB,
};
