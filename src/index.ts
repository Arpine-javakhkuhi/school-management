import { ApolloServer } from "apollo-server";
// import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
// import cors from 'cors';

import config from "./config/index";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./resolvers";

const app = express();

// Instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(config.PORT).then(({ url }) => {
  console.log(`🚀  Server is running at ${url}`);
});
