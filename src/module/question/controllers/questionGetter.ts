import questionService from "../question.service";

const getQuestions = async(page: number, size: number) => {
    return  await questionService.findQuestions(page, size);
};

export default {
    getQuestions
}