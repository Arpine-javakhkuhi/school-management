import teacherSchema from "./teacher/teacher.schema";
import teacherTypeDefs from "./teacher/teacher.typeDefs";
import userSchema from "./user/user.schema";
import { userTypeDefs } from "./user/user.typeDefs";

const schemas = [userSchema, userTypeDefs, teacherSchema, teacherTypeDefs];

export default schemas;
