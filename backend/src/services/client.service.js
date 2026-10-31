const prisma = require('../config/database');
const ApiError = require('../utils/ApiError');

const NAME_MAX_LENGTH = 150;
const EMAIL_MAX_LENGTH = 255;
const PHONE_MAX_LENGTH = 30;
const ADDRESS_MAX_LENGTH = 300;

const CLIENT_NOT_FOUND = 'Klienti nuk u gjet';
const DUPLICATE_EMAIL = 'Ky email eshte tashme i regjistruar per nje klient tjeter';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Kontrollon formatin e id-se para se te pyesim databazen.
 * Id-ja e pavlefshme nuk duhet te kthej gabim 500 nga Prisma.
 */
function assertValidId(id) {
  if (typeof id !== 'string' || !UUID_REGEX.test(id)) {
    throw new ApiError(400, 'Id e pavlefshme');
  }
}

/**
 * Pret te dhenat e klientit dhe kthen nje objekt qe permban vetem fushat e lejuara.
 * Fushat opsionale qe vijne bosh ('' ose null) ruhen si null.
 */
function buildClientData(data = {}) {
  const payload = {};

  if (data.name !== undefined) {
    payload.name = typeof data.name === 'string' ? data.name.trim() : data.name;
  }

  if (data.email !== undefined) {
    const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : data.email;
    payload.email = email === '' || email === null ? null : email;
  }

  if (data.phone !== undefined) {
    const phone = typeof data.phone === 'string' ? data.phone.trim() : data.phone;
    payload.phone = phone === '' || phone === null ? null : phone;
  }

  if (data.address !== undefined) {
    const address = typeof data.address === 'string' ? data.address.trim() : data.address;
    payload.address = address === '' || address === null ? null : address;
  }

  return payload;
}

/**
 * Kontroll i mbrojtjes ne nivel sherbimi: edhe nese rruga nuk perdor validimin,
 * klienti nuk krijohet/nderrohet me emer bosh.
 */
function requireName(payload) {
  if (!payload.name || typeof payload.name !== 'string' || !payload.name.trim()) {
    throw new ApiError(400, 'Emri eshte i detyrueshem');
  }
}

function handlePrismaError(error) {
  if (error.code === 'P2002') {
    throw new ApiError(409, DUPLICATE_EMAIL);
  }

  if (error.code === 'P2025') {
    throw new ApiError(404, CLIENT_NOT_FOUND);
  }

  throw error;
}

/**
 * Kthen vetem klientet e perdoruesit te kycur.
 */
async function list(userId) {
  return prisma.client.findMany({
    where: { userId },
    orderBy: [{ name: 'asc' }, { createdAt: 'asc' }],
  });
}

/**
 * Kthen nje klient te perdoruesit te kycur ose 404.
 */
async function getById(userId, id) {
  assertValidId(id);

  const client = await prisma.client.findFirst({
    where: { id, userId },
  });

  if (!client) {
    throw new ApiError(404, CLIENT_NOT_FOUND);
  }

  return client;
}

/**
 * Krijon nje klient te lidhur me perdoruesin e kycur.
 */
async function create(userId, data) {
  const payload = buildClientData(data);
  requireName(payload);

  try {
    return await prisma.client.create({
      data: {
        ...payload,
        userId,
      },
    });
  } catch (error) {
    return handlePrismaError(error);
  }
}

/**
 * Nderron te dhenat e nje klienti te perdoruesit te kycur.
 * Klienti i nje perdoruesi tjeter nuk mund te ndryshohet.
 */
async function update(userId, id, data) {
  assertValidId(id);
  await getById(userId, id);

  const payload = buildClientData(data);
  requireName(payload);

  try {
    return await prisma.client.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    return handlePrismaError(error);
  }
}

/**
 * Fshin nje klient te perdoruesit te kycur.
 */
async function remove(userId, id) {
  assertValidId(id);
  await getById(userId, id);

  try {
    await prisma.client.delete({
      where: { id },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  ADDRESS_MAX_LENGTH,
};
