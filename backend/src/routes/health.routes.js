const express = require('express');
const prisma = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    console.error('Health check: lidhja me databazën dështoi.');
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

module.exports = router;