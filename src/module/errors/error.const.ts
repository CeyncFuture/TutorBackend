/**
 * author Thilina Pahalagedara
 * created on 03-08-2024-00h-49m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

export const errorMessages = {
    BAD_REQUEST: {
        DEFAULT: "Input value does not correct!",
        EMAIL_NOT_EXISTS: "Your email does not have an account. Please sign in first!",
        WRONG_PASSWORD: "Incorrect email or password. Please check your details and try again!"
    },
    UNAUTHORIZED: {
        DEFAULT: "Invalid password!",
        AUTH_HEADER_NOT_EXIST: "Authorization header is required!",
        AUTH_TOKEN_NOT_EXIST: "Authorization token is missing from the header!",
    },
    NOT_FOUND: {
        USER_NOT_EXIST: "User not found!",
        PENDING_USER_NOT_EXIST: "No pending verification request found for this user!"
    },
    INTERNAL_SERVER_ERROR: {
        DEFAULT: "Internal server error!"
    },
    CONFLICT: {
        EMAIL_EXISTS: "Your email already exists!",
    },
    NOT_ACCEPTABLE: {
        DEFAULT: "Invalid request!"
    },
    FORBIDDEN: {
        NOT_AUTHORIZED_ROLE: "You are not authorized to this resources!",
        INVALID_OTP: "OTP is not valid!",
        EXPIRED_OTP: "OTP is expired!",
    },
    VALIDATION: {
        EMAIL_R: {
            "any.required": "Email is required!",
            "string.email": "Invalid email!",
            "string.empty": "Email can not be empty!",
        },
        PASSWORD_R: {
            "any.required": "Password is required!",
            "string.empty": "Password can not be empty!",
        },
        FIRST_NAME_R: {
            "any.required": "First name is required!",
            "string.empty": "First name can not be empty!",
        },
        LAST_NAME_R: {
            "any.required": "Last name is required!",
            "string.empty": "Last name can not be empty!",
        },
        COUNTRY_CODE: {
            "string.empty": "Country code can not be empty!",
        },
        PHONE_NUMBER: {
            "string.empty": "Phone number can not be empty!",
        },
        OTP_R: {
            "any.required": "OTP is required!",
            "string.empty": "OTP can not be empty!",
        }
    }
}