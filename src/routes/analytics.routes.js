/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Financial insights APIs
 */

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get income, expenses, and balance
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 */

/**
 * @swagger
 * /api/analytics/category:
 *   get:
 *     summary: Category-wise totals
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown
 */

/**
 * @swagger
 * /api/analytics/recent:
 *   get:
 *     summary: Recent transactions
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity
 */

/**
 * @swagger
 * /api/analytics/monthly:
 *   get:
 *     summary: Monthly trends
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly data
 */

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