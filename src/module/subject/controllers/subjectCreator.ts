/**
 * author Thilina Pahalagedara
 * created on 24-08-2024-21h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import { ISubject, ISubjectCategory, ISubjectCreationInputSanitizer } from "../subject.interface"
import SubjectService from "../subject.service"

const createSubject = async(sanitizedInputs: ISubjectCreationInputSanitizer) => {

    const category: ISubjectCategory = {
        name: sanitizedInputs.category_name
    }

    //Check is category already exist
    let dbCategory = await SubjectService.findCategoryByName(sanitizedInputs.category_name);
    
    //Create category if does not exist
    if(!dbCategory)
        dbCategory = await SubjectService.saveCategory(category);

    const subject: ISubject = {
        category_id: dbCategory.id,
        name: sanitizedInputs.subject_name,
    }

    await SubjectService.saveSubject(subject);
}


export default {
    createSubject,
}