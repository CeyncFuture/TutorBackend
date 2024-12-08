import tutorService from "../tutor.service";

const getTutors = async(page: number) => {
    const dbTutor = await tutorService.findTutors(page);
    console.log(dbTutor);
    return  await tutorService.findTutors(page);
};

export default {
    getTutors
}