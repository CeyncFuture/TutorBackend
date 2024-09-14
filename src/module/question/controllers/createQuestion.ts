/**
 * author Thilina Pahalagedara
 * created on 08-09-2024-19h-02m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { IQuestionCreationSanitizeInputs, IQuestionModel, IQuestionAttachmentModel } from "../question.interface";
import databaseUtil from "../../../config/database/database.util";
import manageFileUtil from "../../../config/manageFile/manageFile.util";
import questionService from "../question.service";

const createQuestion = async(userId: number, sanitizedInputs: IQuestionCreationSanitizeInputs, files: Express.Multer.File[]) => {

    const question: IQuestionModel = {
        ...sanitizedInputs,
        student_user_id: userId
    };

    let uploadedAttachments: IQuestionAttachmentModel[] = [];

    await Promise.all (
        files.map( async( file ) => {
            const file_path = await manageFileUtil.uploadFile("att/question_attachment", file);
            uploadedAttachments.push({file_path: file_path});
        })
    );

    //Get transaction instance for roll back the db saving.
    const sequelizeInstance = databaseUtil.getSequelizeInstance();
    const transaction = await sequelizeInstance.transaction();

    try{

        const bdQuestion = await questionService.saveQuestion(question, transaction);

        uploadedAttachments.forEach((attachment)=>{
            attachment.question_id = bdQuestion.id
        })

        const bdQuestionAttachment = await questionService.saveBulkQuestionAttachment(uploadedAttachments, transaction);
        transaction.commit();

        return {
            question: bdQuestion,
            attachment: bdQuestionAttachment
        };
    }catch(err){
        transaction.rollback();
    }

}

export default {
    createQuestion,
}