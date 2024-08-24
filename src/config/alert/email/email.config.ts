/**
 * author Thilina Pahalagedara
 * created on 18-08-2024-00h-15m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { constants } from "../../../constants";
import { INodeMailer } from "./email.interface";
import NotFoundError from "../../../module/errors/classes/NotFoundError";

const nodemailerConfig = () => {

    const EMAIL_HOST = constants.EMAIL.HOST;
    const EMAIL_PORT = constants.EMAIL.PORT;
    const EMAIL_SSL = constants.EMAIL.SSL;
    const EMAIL_USERNAME = constants.EMAIL.USER;
    const EMAIL_PASSWORD = constants.EMAIL.PASS;
    
    if(!EMAIL_HOST){
        throw new NotFoundError('Email Host is not defined');
    }
    if(!EMAIL_PORT){
        throw new NotFoundError('Email Port is not defined');
    }
    if(!EMAIL_SSL){
        throw new NotFoundError('Email SSL is not defined');
    }
    if(!EMAIL_USERNAME){
        throw new NotFoundError('Email Username is not defined');
    }
    if(!EMAIL_PASSWORD){
        throw new NotFoundError('Email Password is not defined');
    }

    const connection: INodeMailer = {
        host: EMAIL_HOST,   
        port: EMAIL_PORT,
        secure: EMAIL_SSL === "true",
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        }
    }

    return(connection);
}


export default {
    nodemailerConfig,
}

