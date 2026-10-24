const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const ApiError = require('../utils/ApiError');

const SALT_ROUNDS = 12;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const INVALID_CREDENTIALS_MESSAGE = 'Email ose fjalekalim i pasakte';

/**
 * Te dhenat e kerkuara per regjistrim: name, email, password
 */
function validateRegistrationData({ name, email, password }) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new ApiError(400, 'Emri eshte i detyrueshem');
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new ApiError(400, 'Email-i eshte i detyrueshem');
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new ApiError(400, 'Email-i nuk eshte i vlefshem');
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(400, 'Fjalekalimi eshte i detyrueshem');
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Fjalekalimi duhet te kete te pakten 6 karaktere');
  }

  return {
    name: name.trim(),
    email: normalizedEmail,
    password,
  };
}

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function validateLoginData({ email, password }) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new ApiError(400, 'Email-i eshte i detyrueshem');
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(400, 'Fjalekalimi eshte i detyrueshem');
  }

  return {
    email: email.trim().toLowerCase(),
    password,
  };
}

function createToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new ApiError(500, 'JWT_SECRET nuk eshte konfiguruar');
  }

  return jwt.sign(
    { userId: user.id, email: user.email },
    secret,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Regjistron nje perdorues te vlefshem.
 * Fjalekalimi hash-ohet me bcrypt dhe nuk ruhet si tekst i thjeshte.
 */
async function register(data) {
  const { name, email, password } = validateRegistrationData(data);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, 'Ky email eshte tashme i regjistruar');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return toPublicUser(user);
  } catch (error) {
    if (error.code === 'P2002') {
      throw new ApiError(409, 'Ky email eshte tashme i regjistruar');
    }
    throw error;
  }
}

/**
 * Hyrje: kerkon perdoruesin sipas email-it, verifikon fjalekalimin me bcrypt,
 * krijon JWT vetem kur te dhenat jane te sakta.
 */
async function login(data) {
  const { email, password } = validateLoginData(data);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, INVALID_CREDENTIALS_MESSAGE);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new ApiError(401, INVALID_CREDENTIALS_MESSAGE);
  }

  const token = createToken(user);

  return {
    user: toPublicUser(user),
    token,
  };
}

module.exports = {
  register,
  login,
  validateRegistrationData,
  validateLoginData,
  createToken,
};
