const express = require('express');
const { create, getAll } = require('../controllers/transaction.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/roles.middleware');

const router = express.Router();

// admin only
router.post('/', authenticate, authorize('admin'), create);

// analyst + admin
router.get('/', authenticate, authorize('analyst', 'admin'), getAll);

module.exports = router;