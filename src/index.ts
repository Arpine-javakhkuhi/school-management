import { ApolloServer } from "apollo-server";
// import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
// import cors from 'cors';

import config from "./config/index";
import typeDefs from "./schemas/typeDefs";

const app = express();

const resolvers = {
  User: {
    users: () => [],
  },
};

// Instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(config.PORT).then(({ url }) => {
  console.log(`🚀  Server is running at ${url}`);
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// // Note you must call `start()` on the `ApolloServer`
// // instance before passing the instance to `expressMiddleware`
// await server.start();

// // Specify the path where we'd like to mount our server
// app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));
