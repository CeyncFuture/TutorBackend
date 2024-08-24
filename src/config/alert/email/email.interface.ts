/**
 * author Thilina Pahalagedara
 * created on 17-08-2024-23h-52m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

interface IMailOptions {
    from: string;
    to: string;
    subject: string;
};

interface INodeMailer {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    }
};

interface mailOption {
    receiver: string | string[],
    subject: string,
};

export {
    IMailOptions,
    INodeMailer,
    mailOption,
}