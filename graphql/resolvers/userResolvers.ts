import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserInput {
  email: string;
  name: string;
  password: string;  // Note: Handling plaintext passwords is not recommended for production
  genres: string[];
  describeYourself: string[];
  lookingFor: string[];
  bio?: string;
  website?: string;
  location?: string;
}

const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id: parseInt(id, 10) }, // Converting id to number as Prisma expects it
      });
    },
  },
  Mutation: {
    createUser: async (_: any, { userInput }: { userInput: UserInput }) => {
      return await prisma.user.create({
        data: userInput,
      });
    },
    updateUser: async (_: any, { id, userInput }: { id: string; userInput: UserInput }) => {
      return await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: userInput,
      });
    },
  },
};

export default userResolvers;
