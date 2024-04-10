import subjectModel from "../models/subject.model";
import createSubjectValidation from "../validators/subject/createSubject.validator";
import checkIfExists from "../utils/teacher.service";
import SUCCESS_MESSAGES from "../constants/successMessages";
import ERROR_MESSAGES from "../constants/errorMessages";
import checkIfSubjectExists from "../utils/subject.service";
import editSubjectValidation from "../validators/subject/editSubject.validator";

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
      const { count } = await subjectModel.delete(+id);

      const responseMessage = count
        ? ERROR_MESSAGES.failedToDeleteSubject
        : SUCCESS_MESSAGES.subjectSuccessfullyDeleted;

      return {
        isSuccess: !!count,
        message: responseMessage,
      };
    },

    editSubject: async (_, { id, editSubjectInput }) => {
      await editSubjectValidation({ ...editSubjectInput, id: +id });
      await checkIfSubjectExists(+id);

      const newSubject = await subjectModel.update(+id, editSubjectInput);

      return {
        isSuccess: !!newSubject,
        message: SUCCESS_MESSAGES.subjectSuccessfullyUpdated,
      };
    },
  },
};

export default subjectResolver;
