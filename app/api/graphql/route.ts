import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
  }

  type User {
    id: ID!
    email: String!
    name: String
    # Add other fields as needed
  }
`;

const resolvers = {
  Query: {
    allUsers: async () => {
      return await prisma.user.findMany();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };