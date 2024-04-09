import { Prisma, Subjects, Teachers } from "@prisma/client";

// import { TeacherDto } from "../dtos/teacher.dto";

export type SubjectsTeacher = Pick<Teachers, "id" | "firstName" | "lastName">;

export interface CreateSubjectInput {
  name: string;
  teacherId?: number;
}

export interface SubjectInterface {
  create: (subjectData: CreateSubjectInput) => Promise<Subjects | undefined>;

  //   findAll: () => Promise<
  //     ({
  //       teacher: TeacherSubjects[];
  //     } & Subjects)[]
  //   >;

  //   getById: (id: number) => Promise<Subjects | null>;

  //   update: (id: number, data: Prisma.TeachersUpdateInput) => Promise<Subjects>;

  //   delete: (id: number) => Promise<Prisma.BatchPayload>;
}

// export interface CreateTeacherInputData {
//   createTeacherInput: TeacherDto;
// }
