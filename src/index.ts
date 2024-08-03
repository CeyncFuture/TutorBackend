/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-15h-46m
 * github: https://github.com/Pahalagedara
 * copyright 2024
 */
import 'express-async-errors';
import express from "express";
import cors from "cors";
import { constants } from "./constants";
import { corsConfig } from "./config/security/cors.config";
import DatabaseConfig from "./config/database/database.config";
import DatabaseUtil from "./config/database/database.util";
import MainTouter from "./route";
import NotFoundError from "./module/errors/classes/NotFoundError";
import ErrorHandler from "./module/errors/middleware/errorHandler";

const app = express();

//configure specific CORS options
app.use(cors(corsConfig));

app.use(express.json());


//Other endpoints
app.use(constants.API.PREFIX, MainTouter)

//Health checker
app.get(constants.API.PREFIX.concat("/health"), (req, res) => {
  res.send("Hello, API is working!");
});

//Define not found endpoint
app.use((req, res, next) => {  
  throw new NotFoundError("API endpoint not found!");
});

//error handle middleware
app.use(ErrorHandler.handleErrors);

const start = async() => {
  try {
    app.listen(constants.SERVER.PORT, async() => {

      //connect database
      const databaseConf = DatabaseConfig.getDBConfig();
      await DatabaseUtil.connectDB(databaseConf.connection);

      console.log(`Server is running on port ${constants.SERVER.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();