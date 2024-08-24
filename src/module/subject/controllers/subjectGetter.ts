/**
 * author Thilina Pahalagedara
 * created on 24-08-2024-21h-30m
 * github: https://github.com/Pahalagedara
 * copyright 2024
*/

import subjectService from "../subject.service"

const getSubjects = async() => {
    const subjects = await subjectService.findAll();
    return subjects;
};

export default {
    getSubjects,
}