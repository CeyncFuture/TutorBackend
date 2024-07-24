/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-19h-03m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

interface IDbConnection {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

export {
    IDbConnection
}