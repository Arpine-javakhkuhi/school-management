import { Prisma, Subjects, Teachers } from "@prisma/client";
import { GraphQLError } from "graphql";

import {
  CreateSubjectInput,
  SubjectInterface,
  SubjectsTeacher,
} from "../interfaces/subject.interface";
import prisma from "../config/prisma";
import errorMessages from "../constants/errorMessages";
import { HTTPStatus } from "../types/main.types";

class SubjectModel implements SubjectInterface {
  async create(subjectData: CreateSubjectInput): Promise<Subjects | undefined> {
    try {
      const data: CreateSubjectInput = { name: subjectData.name };
      if (subjectData.teacherId) {
        data.teacherId = +subjectData.teacherId;
      }

      const subject = await prisma.subjects.create({
        data,
      });

      return subject;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Foreign key constraint failed on the field: applicantId
      if (error.code === "P2003") {
        throw new GraphQLError(errorMessages.teacherNotFound, {
          extensions: {
            code: HTTPStatus.BadRequest,
          },
        });
      }

      throw error;
    }
  }

  async findAll(): Promise<
    ({
      teacher: SubjectsTeacher | null;
    } & Subjects)[]
  > {
    return prisma.subjects.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  //   async getById(id: number) {
  //     return prisma.teachers.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //   }

  //   async update(
  //     id: number,
  //     data: Prisma.TeachersUpdateInput
  //   ): Promise<Teachers> {
  //     const updatedData = { ...data };

  //     return prisma.teachers.update({
  //       where: {
  //         id,
  //       },
  //       data: updatedData,
  //     });
  //   }

  //   async delete(id: number): Promise<Prisma.BatchPayload> {
  //     return prisma.teachers.deleteMany({
  //       where: {
  //         id,
  //       },
  //     });
  //   }
}

const subjectModel = new SubjectModel();
export default subjectModel;
