import { PrismaClient, RoleEnum } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles: RoleEnum[] = ['USER', 'ADMIN'];

  for (const role of roles) {
    const existingRole = await prisma.role.findUnique({
      where: { name: role },
    });

    if (!existingRole) {
      await prisma.role.create({
        data: { name: role },
      });
      console.log(`Role ${role} created`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
