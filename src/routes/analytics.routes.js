const express = require('express');
const { summary, category,recent,monthly } = require('../controllers/analytics.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/roles.middleware');

const router = express.Router();

// viewer + analyst + admin
router.get('/summary', authenticate, authorize('viewer', 'analyst', 'admin'), summary);
router.get('/recent',authenticate,authorize('analyst','admin'),recent);
router.get('/monthly',authenticate,authorize('analyst','admin'),monthly);
// analyst + admin
router.get('/category', authenticate, authorize('analyst', 'admin'), category);

module.exports = router;