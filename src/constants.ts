/**
 * author Thilina Pahalagedara
 * created on 24-07-2024-16h-34m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/
import dotenv from "dotenv";
dotenv.config();

export const constants = {
    APP_NAME: "tutor",
    
    // Environment types
    ENVIRONMENTS: {
        DEVELOPMENT: "development",
        PRODUCTION: "production",
        TESTING: "testing",
    },

    // API settings
    API: {
        PREFIX: "/api/v1",
    },

    // Server settings
    SERVER: {
        PORT: process.env.PORT || 3000, // Use environment variable or default to 3000
        ENVIRONMENT: process.env.NODE_ENV || "development", // Default to development
    },

    //Database
    DATABASE: {
        MODEL_NAMES: {
            AUTH: "auth",
            ROLE: "role",
            USER: "user",
            STUDENT: "student",
            TUTOR: "tutor",
        },
        TABLE_NAMES: {
            AUTHS: "auths",
            ROLES: "roles",
            USERS: "users",
            STUDENTS: "students",
            TUTORS: "tutors",
        },
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
    },

    //Time related
    SESSIONS: {
        TOKENS: {
            ACCESS_TOKEN: {
                NAME: "access-token",
                EXPIRATION: process.env.ACCESS_TOKEN_EXP
                    ? parseInt(process.env.ACCESS_TOKEN_EXP)
                    :  2 * 60, //default 2min
            },
            REFRESH_TOKEN: {
                NAME: "refresh-token",
                EXPIRATION: process.env.REFRESH_TOKEN_EXP
                    ? parseInt(process.env.REFRESH_TOKEN_EXP)
                    : 30 * 24 * 60, // default 30 days
            },
            SECRET_KEY: process.env.SECRET_KEY || "default-secret-key*"
        },
        COOLDOWN_TIME: 60, //second
        MAXIMUM_RETRY: 3, // Maximum number of retry attempts
    }
};