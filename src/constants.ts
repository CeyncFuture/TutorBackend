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
    ENV: {
        DEVELOPMENT: "development",
        PRODUCTION: "production",
        TEST: "test",
    },

    // API settings
    API: {
        PREFIX: "/api/v1",
    },

    // Server settings
    SERVER: {
        PORT: process.env.PORT || 3000, // Use environment variable or default to 3000
        ENV: process.env.NODE_ENV || "development", // Default to development
    },

    //Database
    DATABASE: {
        MODEL_NAMES: {
            AUTH: "auth",
            ROLE: "role",
            USER: "user",
            STUDENT: "student",
            TUTOR: "tutor",
            PENDING_USER: "pending_user",
            SUBJECT: "subject",
            SUBJECT_CATEGORY: "subject_category",
            SUBJECT_TUTOR: "subject_tutor",
            QUESTION: "question",
            QUESTION_ATTACHMENT: "question_attachment",
        },
        TABLE_NAMES: {
            AUTHS: "auths",
            ROLES: "roles",
            USERS: "users",
            STUDENTS: "students",
            TUTORS: "tutors",
            PENDING_USERS: "pending_users",
            SUBJECTS: "subjects",
            SUBJECT_CATEGORIES: "subject_categories",
            SUBJECTS_TUTORS: "subjects_tutors",
            QUESTIONS: "questions",
            QUESTION_ATTACHMENTS: "question_attachments",
        },
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
    },

    //Time and security related 
    SESSIONS: {
        TOKENS: {
            ACCESS_TOKEN: {
                NAME: "access-token",
                EXP: process.env.ACCESS_TOKEN_EXP
                    ? parseInt(process.env.ACCESS_TOKEN_EXP)
                    :  10 * 60, //default 2min
            },
            REFRESH_TOKEN: {
                NAME: "refresh-token",
                EXP: process.env.REFRESH_TOKEN_EXP
                    ? parseInt(process.env.REFRESH_TOKEN_EXP)
                    : 30 * 24 * 60, // default 30 days
            },
            SECRET_KEY: process.env.SECRET_KEY || "default-secret-key",
        },
        COOLDOWN_TIME: 60, //1 min
        BLOCKED_COOL_DOWN_TIME: 3 * 60 * 60, //3 hour
        VALID_TIME: 5 * 60, //5 minute
        MAXIMUM_RETRY: 3, // Maximum number of retry attempts
        PASSWORD_SALT_ROUND: process.env.PASSWORD_SALT_ROUND || 10,

    },

    //Formats
    FORMATS: {
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm:ss",
        TIMESTAMP: "YYYY-MM-DD HH:mm:ss",
    },

    //User roles
    USER_ROLES: {
        ADMIN: "admin",
        TUTOR: "tutor",
        STUDENT: "student",
        ALL: "all",
    },

    //Email
    EMAIL: {
        HOST: process.env.EMAIL_HOST,
        PORT: parseInt(process.env.EMAIL_PORT || "") || 587,
        SSL: process.env.EMAIL_SSL,
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS,
        SENDER_IDENTITY: process.env.SENDER_IDENTITY,
    },

    //AWS config
    AWS: {
        S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || "",
        S3_SECRET_KEY: process.env.S3_SECRET_KEY || "",
        S3_REGION: process.env.S3_REGION || "us-east-1",
        S3_BUCKET: process.env.S3_BUCKET || "your-s3-bucket-name",
        S3_SESSION_EXPIRE: (process.env.S3_SESSION_EXPIRE && parseInt(process.env.S3_SESSION_EXPIRE)) || 3600
      },

    //file validation
    FILE_VALIDATION: {
        MAX_FILE_SIZE: 2 * 1024 * 1024, // 10MB
        FILE_NAME_MAX_LENGTH: 40,
        IMAGE_MIME_TYPES: [
            'image/jpeg',  // JPEG Image
            'image/png',   // PNG Image
        ],
        DOCUMENT_MIME_TYPES: [
            'application/pdf',
        ]
    },

    FTP: {
        HOST: process.env.FTP_HOST || "",
        FILE_ACCESS_URL: process.env.FILE_ACCESS_URL,
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD,
        SECURE: process.env.SECURE == "true" // Set to true if using FTPS
    }

};