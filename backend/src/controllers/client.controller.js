const clientService = require('../services/client.service');

/**
 * GET /api/clients
 * Pergjigje sukses: vetem klientet e perdoruesit te kycur.
 */
async function list(req, res, next) {
  try {
    const clients = await clientService.list(req.user.id);

    return res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * GET /api/clients/:id
 */
async function getById(req, res, next) {
  try {
    const client = await clientService.getById(req.user.id, req.params.id);

    return res.status(200).json({
      success: true,
      data: { client },
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * POST /api/clients
 * Pergjigje sukses: 201 dhe klienti i krijuar.
 */
async function create(req, res, next) {
  try {
    const client = await clientService.create(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: 'Klienti u krijua me sukses',
      data: { client },
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * PUT /api/clients/:id
 */
async function update(req, res, next) {
  try {
    const client = await clientService.update(req.user.id, req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Klienti u perditesua me sukses',
      data: { client },
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * DELETE /api/clients/:id
 */
async function remove(req, res, next) {
  try {
    await clientService.remove(req.user.id, req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Klienti u fshi me sukses',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
