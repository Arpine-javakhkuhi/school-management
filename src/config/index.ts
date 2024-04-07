import "dotenv/config";

const { PORT, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN } = process.env;

export default {
  PORT,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
};
