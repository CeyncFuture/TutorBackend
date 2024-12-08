import questionService from "../question.service";

const getQuestions = async(page: number) => {
    return await questionService.findQuestions(page);
};

export default {
    getQuestions
}