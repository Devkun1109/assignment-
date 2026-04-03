const express = require('express');
const { create, getAll } = require('../controllers/transaction.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/roles.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { transactionSchema } = require('../validators/transaction.validator');

const router = express.Router();

// admin only
router.post('/',authenticate,authorize('admin'),create);
router.put('/:id', authenticate, authorize('admin'), update);
router.delete('/:id', authenticate, authorize('admin'), remove);
// analyst + admin
router.get('/',authenticate,authorize('analyst','admin'),getAll);
router.post('/',authenticate,authorize('admin'),validate(transactionSchema),create);

module.exports=router;