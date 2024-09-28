import tutorService from "../tutor.service";

const getTutors = async() => {
    return  await tutorService.findTutors();
};

export default {
    getTutors
}