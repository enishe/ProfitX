const express = require('express');
const clientController = require('../controllers/client.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { validateCreateClient, validateUpdateClient } = require('../validators/client.validators');

const router = express.Router();

/** Te gjitha rrugut e klienteve kerkojne token te vlefshem. */
router.use(authenticate);

router.get('/', clientController.list);
router.post('/', validate(validateCreateClient), clientController.create);
router.get('/:id', clientController.getById);
router.put('/:id', validate(validateUpdateClient), clientController.update);
router.delete('/:id', clientController.remove);

module.exports = router;
