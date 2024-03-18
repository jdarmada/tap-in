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
    // Adjust to find a user by email
    // getUser: async (_: any, { email }: { email: string }) => {
    //   return await prisma.user.findUnique({
    //     where: { email }, // Use email to find the user
    //   });
    // },
   
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }) => {
      return await prisma.user.create({
        data: input, // 'data' property correctly structured
      });
    },
  }
};

export default userResolvers;