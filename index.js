import { ApolloServer } from "apollo-server";

import typeDefs from "./schema.js";
import Query from "./resolvers/query.js";
import Mutation from "./resolvers/mutation.js";
import Category from "./resolvers/category.js";
import Product from "./resolvers/product.js";

import db from "./mocks.js";

const server = new ApolloServer({
   typeDefs,
   resolvers: {
      Query,
      Mutation,
      Category,
      Product,
   },
   context: {
      db,
   },
});

server.listen().then(({ url }) => {
   console.log(`Server is ready at ${url}`);
});
