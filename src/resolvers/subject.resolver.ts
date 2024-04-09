import subjectModel from "../models/subject.model";
import teacherModel from "../models/teacher.model";
import createSubjectValidation from "../validators/subject/createSubject.validator";

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
        await teacherModel.getById(+createSubjectInput.teacherId);
      }

      const teacher = await subjectModel.create(createSubjectInput);

      return teacher;
    },

    //   deleteTeacher: async (_, { id }) => {
    //     await checkIfExists(+id);

    //     const { count } = await teacherModel.delete(+id);

    //     return {
    //       isSuccess: !!count,
    //       message: SUCCESS_MESSAGES.teacherSuccessfullyDeleted,
    //     };
    //   },

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
