import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  const file = resolve('prisma', 'seeders.json');
  const seed = JSON.parse(readFileSync(file));

  await prisma.demanda.createMany({
    data: seed.demandas,

  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
