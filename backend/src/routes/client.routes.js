const express = require('express');
const clientController = require('../controllers/client.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

/** Te gjitha rrugut e klienteve kerkojne token te vlefshem. */
router.use(authenticate);

router.get('/', clientController.list);
router.post('/', clientController.create);
router.get('/:id', clientController.getById);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.remove);

module.exports = router;
