import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();



interface UserInput {
  email: string;
  name: string;
  password: string; 
  genres: string[];
  describeYourself: string[];
  lookingFor: string[];
  bio?: string;
  website?: string;
  location?: string;
}

const userResolvers = {
  Query: {
    allUsers: async (): Promise<User[]> => { 
      try {
        const users = await prisma.user.findMany();
        return users || [];
      } catch (error) {
        console.error(error);
        return []; 
      }
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }) => {
      return await prisma.user.create({
        data: input, 
      });
    },
  }
};

export default userResolvers;