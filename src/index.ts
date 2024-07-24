/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-15h-46m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */

import express from "express";
import cors from "cors";
import { corsConfig } from "./config/security/cors.config";
import { constants } from "./constants";
import DatabaseConfig from "./config/database/database.config";
import DatabaseUtil from "./config/database/database.util";

const app = express();

//configure specific CORS options
app.use(cors(corsConfig));

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

const start = () => {
  try {
    app.listen(constants.SERVER.PORT, () => {

      //connect database
      const databaseConf = DatabaseConfig.getDBConfig();
      DatabaseUtil.connectDB(databaseConf.connection);

      console.log(`Server is running on port ${constants.SERVER.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();