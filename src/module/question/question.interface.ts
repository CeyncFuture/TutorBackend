/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-17h-19m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Model, Optional } from "sequelize";

interface IQuestion {
    id: number;
    student_user_id: number;
    question: string;
    phone_number: string;
};

interface IQuestionModel extends Optional<IQuestion, 'id'> {};

class Question extends Model<IQuestion, IQuestionModel> implements IQuestion {
    public id!: number;
    public student_user_id!: number;
    public question!: string;
    public phone_number!: string;
};

interface IQuestionAttachment {
    id: number;
    question_id?: number;
    file_path: string;
};

interface IQuestionAttachmentModel extends Optional<IQuestionAttachment, "id">{};

class QuestionAttachment extends Model<IQuestionAttachment, IQuestionAttachmentModel> implements IQuestionAttachment {
    public id!: number;
    public question_id!: number;
    public file_path!: string;
}

interface IQuestionCreationSanitizeInputs {
    question: string;
    phone_number: string;
}

export {
    IQuestion,
    IQuestionModel,
    Question,
    IQuestionAttachment,
    IQuestionAttachmentModel,
    QuestionAttachment,
    IQuestionCreationSanitizeInputs,
}