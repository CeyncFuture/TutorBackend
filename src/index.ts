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
import { NotFoundError } from "./module/errors/classes/NotFoundError";
import ErrorHandler from "./module/auth/middleware/errorHandler";
import Router from "./router";

const app = express();

//configure specific CORS options
app.use(cors(corsConfig));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello, API is working!");
});

app.use(constants.API.PREFIX, Router)

app.use((req, res, next) => {
  throw new NotFoundError("API Endpoint Not Found!");
});

//error handle middleware
app.use(ErrorHandler.handleErrors);

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