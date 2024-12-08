/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-17h-21m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { Transaction } from "sequelize"
import { IQuestionAttachmentModel, IQuestionModel, Question, QuestionAttachment } from "./question.interface"

const saveQuestion = async(question: IQuestionModel, transaction?: Transaction) => {
    return await Question.create(question, {transaction});
}

const saveBulkQuestionAttachment = async(attachments: IQuestionAttachmentModel[], transaction?: Transaction) => {
    return await QuestionAttachment.bulkCreate(attachments, {transaction});
}

const findQuestions = async(page: number) => {
    const { count, rows } = await Question.findAndCountAll({
        include: [
            {
                model: QuestionAttachment
            }
        ],
        limit: 10,
        offset: page * 10
    });
    
    return {
        questions: rows,
        totalElements: count
    }
}

export default {
    saveQuestion,
    saveBulkQuestionAttachment,
    findQuestions
}