import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
// import cors from 'cors';

import config from "./config/index";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./resolvers";
import context from "./context";

const app = express();

const main = async () => {
  // Instance of ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(config.PORT) },
    context: context,
  });

  console.log(`🚀  Server is running at ${url}`);
};

main();
