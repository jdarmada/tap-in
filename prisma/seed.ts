

import { PrismaClient } from "@prisma/client";
import {faker} from "@faker-js/faker";
import { User } from "@/types/types";

const prisma = new PrismaClient();

const describeYourselfOptions: string[] = ['Sound Engineer', 'Rapper', 'Singer', 'Producer', 'Guitarist', 'Drummer', 'Bassist', 'Pianist', 'Song-Writer', 'Studio'];
const genresOptions: string[] = ['Jazz', 'Rock', 'Classical', 'Pop', 'Electronic', 'Hip Hop', 'Folk', 'Blues', 'Country', 'Reggae', 'Metal', 'Punk', 'R&B', 'Latin', 'World', 'Other'];
const lookingForOptions: string[] = ['Sound Engineer', 'Rapper', 'Singer', 'Producer', 'Guitarist', 'Drummer', 'Bassist', 'Pianist', 'Song-Writer', 'Studio'];

function getRandomSubarray(arr: string[], size: number): string[] {
    const shuffled = arr.slice(0);
    let i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

async function main(): Promise<void> {
  const users: User[] = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      genres: getRandomSubarray(genresOptions, faker.number.int({ min: 1, max: 5 })), 
      describeYourself: [faker.helpers.arrayElement(describeYourselfOptions)],
      lookingFor: [faker.helpers.arrayElement(lookingForOptions)],
      bio: faker.lorem.paragraph(),
      website: faker.internet.url(),
      location: faker.location.city(),
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });