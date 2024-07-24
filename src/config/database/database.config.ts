/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-18h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { IDbConnection } from "./database.interface"
import InternalServerError from "../../module/errors/classes/InternalServerError";
import { constants } from "../../constants";

const getDBConfig = () => {

    if(!constants.DATABASE.DB_HOST) throw new InternalServerError("Database host is not defined!");
    if(!constants.DATABASE.DB_PORT) throw new InternalServerError("Database port is not defined!");
    if(!constants.DATABASE.DB_DATABASE) throw new InternalServerError("Database name is not defined!");
    if(!constants.DATABASE.DB_USERNAME) throw new InternalServerError("Database user is not defined!");
    if(!constants.DATABASE.DB_PASSWORD) throw new InternalServerError("Database password is not defined!");

    const connection: IDbConnection = {
        host: constants.DATABASE.DB_HOST,
        port: Number(constants.DATABASE.DB_PORT),
        username: constants.DATABASE.DB_USERNAME,
        password: constants.DATABASE.DB_PASSWORD,
        database: constants.DATABASE.DB_DATABASE,
    };

    return {
        connection
    };
};

export default {
    getDBConfig
};