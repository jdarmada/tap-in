import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import { PrismaClient } from "@prisma/client";
import { resolve } from "path";
import userResolvers from "@/graphql/resolvers/userResolvers";



const prisma = new PrismaClient();

const typeDefs = gql`
  scalar Genre
  scalar Description
  scalar LookingFor

  type Query {
    allUsers: [User!]!
    getUserByEmail(email: String!): User
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    genres: [Genre!]!
    describeYourself: [Description!]!
    lookingFor: [LookingFor!]!
    bio: String
    website: String
    location: String
  }

  input CreateUserInput {
    email: String!
    name: String!
    password: String!
    genres: [String!]!
    describeYourself: [String!]!
    lookingFor: [String!]!
    bio: String
    website: String
    location: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User

  }
`;


const server = new ApolloServer({
  typeDefs,
  resolvers: userResolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };