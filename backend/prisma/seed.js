require('dotenv').config();

const bcrypt = require('bcrypt');
const prisma = require('../src/config/database');

const demoUser = {
  name: 'ProfitX Test User',
  email: 'demo@profitx.local',
  password: 'ProfitXDemo123!',
};

async function main() {
  const passwordHash = await bcrypt.hash(demoUser.password, 10);
  const user = await prisma.user.upsert({
    where: { email: demoUser.email },
    update: {
      name: demoUser.name,
      passwordHash,
    },
    create: {
      name: demoUser.name,
      email: demoUser.email,
      passwordHash,
    },
  });

  const categories = [
    { name: 'Shitje', type: 'INCOME' },
    { name: 'Shpenzime operative', type: 'EXPENSE' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        userId_name_type: {
          userId: user.id,
          name: category.name,
          type: category.type,
        },
      },
      update: {},
      create: { ...category, userId: user.id },
    });
  }

  const clients = [
    { name: 'Klienti Demo', email: 'klienti@profitx.local', phone: '+355 69 000 0001' },
    { name: 'Klienti Shembull', email: 'shembull@profitx.local', phone: '+355 69 000 0002' },
  ];

  for (const client of clients) {
    await prisma.client.upsert({
      where: { userId_email: { userId: user.id, email: client.email } },
      update: { name: client.name, phone: client.phone },
      create: { ...client, userId: user.id },
    });
  }

  const suppliers = [
    { name: 'Furnitori Demo', email: 'furnitori@profitx.local', phone: '+355 68 000 0001' },
    { name: 'Furnitori Shembull', email: 'furnitor.shembull@profitx.local', phone: '+355 68 000 0002' },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { userId_email: { userId: user.id, email: supplier.email } },
      update: { name: supplier.name, phone: supplier.phone },
      create: { ...supplier, userId: user.id },
    });
  }

  console.log('Seed-i përfundoi: 1 përdorues, 2 kategori, 2 klientë dhe 2 furnitorë.');
  console.log(`Përdoruesi demonstrues: ${demoUser.email}`);
}

main()
  .catch((error) => {
    console.error('Seed-i dështoi:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
