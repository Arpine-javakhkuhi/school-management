import subjectSchema from "./subject/subject.schema";
import subjectTypeDefs from "./subject/subject.typeDefs";
import teacherSchema from "./teacher/teacher.schema";
import teacherTypeDefs from "./teacher/teacher.typeDefs";
import userSchema from "./user/user.schema";
import { userTypeDefs } from "./user/user.typeDefs";

const schemas = [
  userSchema,
  userTypeDefs,
  teacherSchema,
  teacherTypeDefs,
  subjectSchema,
  subjectTypeDefs,
];

export default schemas;
