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
        USER_EXISTS: "Your account is already created!"
    },
    NOT_ACCEPTABLE: {
        DEFAULT: "Invalid request!"
    },
    FORBIDDEN: {
        NOT_AUTHORIZED_ROLE: "You are not authorized to this resources!",
        INVALID_OTP: "OTP is not valid!",
        EXPIRED_OTP: "OTP is expired!",
        USER_ALREADY_VERIFIED: "Your account already verified!",
        COOL_DOWN_OTP_REQUEST: "Please wait before making another attempt!",
        TEMPORARILY_BLOCKED_OTP_REQUEST: "You have exceeded the retry count. Please try again later!"
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
        PHONE_NUMBER_R: {
            "string.empty": "Phone number can not be empty!",
            'any.required': 'Phone number is required!',
        },
        ADDRESS_R: {
            'string.empty': 'Address can not be empty!',
            'any.required': 'Address number is required!',
        },
        DEGREE_R: {
            'string.empty': 'Degree is required!',
        },
        HIGH_SCHOOL_R: {
            'string.empty': 'High school can not be empty!',
            "any:required": "High school is required!"
        },
        INTERESTS_R: {
            'string.empty': 'Interests can not be empty!',
            'array.base': 'Interests must be an array of strings!',
            'array.includesRequiredUnknowns': 'Interests must include at least one string!',
            "any:required": "Interests is required!"
        },
        IS_SEND_UNI_R: {
            'boolean.base': 'Is Send University must be a boolean!',
            "any:required": "Is Send University is required!"
        },
        EXP_EARNINGS_R: {
            'number.base': 'Expected earnings must be a number!',
            'number.positive': 'Expected earnings must be positive!',
            "any.required": "Expected earnings can not be empty!'"
        },
        WORK_HOURS: {
            'number.base': 'Work hours must be a number!',
            'number.min': 'Work hours cannot be negative!',
            'number.integer': 'Work hours must be an integer!',
            "any:required": "Work hours is required!"
        },
        OTP_R: {
            "any.required": "OTP is required!",
            "string.empty": "OTP can not be empty!",
        },
        ROLE_R: {
            "any.required": "Role is required!",
            "string.empty": "Role can not be empty!",
            'any.only': 'Role must be one of student, or tutor',
        }
    }
}