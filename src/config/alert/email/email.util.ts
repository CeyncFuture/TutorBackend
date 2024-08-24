/**
 * author Thilina Pahalagedara
 * created on 17-08-2024-23h-51m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import nodemailer from "nodemailer";
import ejs from "ejs";
import emailConfig from "./email.config";
import { constants } from "../../../constants";
import InternalServerError from "../../../module/errors/classes/InternalServerError";
import NodeMailerError from "../../../module/errors/classes/NodemailerError";

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport(emailConfig.nodemailerConfig());

const sendNodeMailerEmail = async (
    receiver: string | string[],
    subject: string,
    body: string,
) => {
    try {
        return await transporter.sendMail({
            from: `${constants.APP_NAME} <${constants.EMAIL.SENDER_IDENTITY}>`,
            to: receiver,
            subject: subject,
            html: body,
        });
        
    } catch (error: any) {
        console.log(error);
        throw new NodeMailerError("", error.code, error.response, error.command);
    }
};

const templateCreate = async(path: string, options: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(__dirname + path, options, (err, data) => {
            if (err) {
                console.log(err);
                reject(new InternalServerError("Something went wrong in email sending!"));
                return;
            }
            resolve(data);
        });
    });
}

//Sending options with email template
const sendOTPViaEmail = async(receiver: string | string[], name: string, otp: string ) => {
    const body = await templateCreate("/templates/otpSend.ejs", {name, otp});
    await sendNodeMailerEmail(receiver, `Verify your ${constants.APP_NAME} account`, body);
}

export default {
    sendNodeMailerEmail,
    sendOTPViaEmail,
}