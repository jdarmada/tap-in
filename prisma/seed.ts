import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'testemail@gmail.com',
      role: 'ADMIN',
      password: 'password123', // Add the required 'password' property
    }
  })
  
}

main()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })