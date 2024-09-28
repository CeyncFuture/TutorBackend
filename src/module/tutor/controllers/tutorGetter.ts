import tutorService from "../tutor.service";

const getTutors = async(page: number) => {
    return  await tutorService.findTutors(page);
};

export default {
    getTutors
}