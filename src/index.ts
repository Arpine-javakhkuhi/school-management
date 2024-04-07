import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
// import cors from 'cors';

import config from "./config/index";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./resolvers";

const app = express();

// Instance of ApolloServer
const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(config.PORT) },
  });

  console.log(`🚀  Server is running at ${url}`);
};

main();
