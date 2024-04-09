import subjectModel from "../models/subject.model";
import teacherModel from "../models/teacher.model";
import createSubjectValidation from "../validators/subject/createSubject.validator";
import checkIfExists from "../utils/teacher.service";
import SUCCESS_MESSAGES from "../constants/successMessages";
import ERROR_MESSAGES from "../constants/errorMessages";

const subjectResolver = {
  Query: {
    getSubjects: async () => {
      const subjects = await subjectModel.findAll();
      return subjects;
    },
  },

  Mutation: {
    createSubject: async (_: unknown, { createSubjectInput }) => {
      await createSubjectValidation(createSubjectInput);

      if (createSubjectInput.teacherId) {
        await checkIfExists(+createSubjectInput.teacherId);
      }

      const teacher = await subjectModel.create(createSubjectInput);

      return teacher;
    },

    deleteSubject: async (_, { id }) => {
      const { count } = await teacherModel.delete(+id);
      const responseMessage = count
        ? ERROR_MESSAGES.failedToDeleteSubject
        : SUCCESS_MESSAGES.subjectSuccessfullyDeleted;

      return {
        isSuccess: !!count,
        message: responseMessage,
      };
    },

    //   editTeacher: async (
    //     _,
    //     { id, editTeacherInput: { firstName, lastName } }
    //   ) => {
    //     await checkIfExists(+id);

    //     const newTeacher = await teacherModel.update(+id, {
    //       firstName,
    //       lastName,
    //     });

    //     return {
    //       isSuccess: !!newTeacher,
    //       message: SUCCESS_MESSAGES.teacherSuccessfullyUpdated,
    //     };
    //   },
  },
};

export default subjectResolver;
