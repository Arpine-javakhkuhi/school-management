import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";

import config from "./config/index";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import context from "./context";

import http from "http";

const app = express();
const httpServer = http.createServer(app);

interface AppContext {
  userId?: number;
}

const main = async () => {
  const server = new ApolloServer<AppContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context,
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.PORT }, resolve),
  );

  /* eslint-disable no-console */
  console.log(`🚀  Server is running at http://localhost:${config.PORT}`);
};

main();
