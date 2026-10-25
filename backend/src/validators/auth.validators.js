const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 6;

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateEmail(email, errors) {
  if (email === undefined || email === null || email === '') {
    errors.push({ field: 'email', message: 'Email-i eshte i detyrueshem.' });
    return;
  }

  if (typeof email !== 'string') {
    errors.push({ field: 'email', message: 'Email-i duhet te jete tekst.' });
    return;
  }

  const normalizedEmail = email.trim();
  if (!normalizedEmail) {
    errors.push({ field: 'email', message: 'Email-i eshte i detyrueshem.' });
  } else if (normalizedEmail.length > MAX_EMAIL_LENGTH) {
    errors.push({ field: 'email', message: 'Email-i nuk mund te kete me shume se 255 karaktere.' });
  } else if (!EMAIL_REGEX.test(normalizedEmail)) {
    errors.push({ field: 'email', message: 'Email-i nuk eshte ne format te vlefshem.' });
  }
}

function validatePassword(password, errors, { registration = false } = {}) {
  if (password === undefined || password === null || password === '') {
    errors.push({ field: 'password', message: 'Fjalekalimi eshte i detyrueshem.' });
    return;
  }

  if (typeof password !== 'string') {
    errors.push({ field: 'password', message: 'Fjalekalimi duhet te jete tekst.' });
    return;
  }

  if (registration && password.length < MIN_PASSWORD_LENGTH) {
    errors.push({ field: 'password', message: 'Fjalekalimi duhet te kete te pakten 6 karaktere.' });
  }
}

function validateRegistration(body) {
  if (!isObject(body)) {
    return [{ field: 'body', message: 'Trupi i kerkeses duhet te jete nje objekt JSON.' }];
  }

  const errors = [];
  const { name, email, password } = body;

  if (name === undefined || name === null || (typeof name === 'string' && !name.trim())) {
    errors.push({ field: 'name', message: 'Emri eshte i detyrueshem.' });
  } else if (typeof name !== 'string') {
    errors.push({ field: 'name', message: 'Emri duhet te jete tekst.' });
  } else if (name.trim().length > MAX_NAME_LENGTH) {
    errors.push({ field: 'name', message: 'Emri nuk mund te kete me shume se 100 karaktere.' });
  }

  validateEmail(email, errors);
  validatePassword(password, errors, { registration: true });

  return errors;
}

function validateLogin(body) {
  if (!isObject(body)) {
    return [{ field: 'body', message: 'Trupi i kerkeses duhet te jete nje objekt JSON.' }];
  }

  const errors = [];
  validateEmail(body.email, errors);
  validatePassword(body.password, errors);
  return errors;
}

module.exports = {
  validateRegistration,
  validateLogin,
};
