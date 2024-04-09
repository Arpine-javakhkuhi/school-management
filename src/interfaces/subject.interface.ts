import { Prisma, Subjects, Teachers } from "@prisma/client";

export type SubjectsTeacher = Pick<Teachers, "id" | "firstName" | "lastName">;

export interface CreateSubjectInput {
  name: string;
  teacherId?: number;
}

export interface SubjectInterface {
  create: (subjectData: CreateSubjectInput) => Promise<Subjects | undefined>;

  findAll: () => Promise<
    ({
      teacher: SubjectsTeacher | null;
    } & Subjects)[]
  >;

  getById: (id: number) => Promise<Subjects | null>;

  update: (id: number, data: CreateSubjectInput) => Promise<Subjects>;

  delete: (id: number) => Promise<Prisma.BatchPayload>;
}
