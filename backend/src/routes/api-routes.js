const express = require('express');
const router = express.Router();
const { checkAuthorization } = require('../middlewares/auth-middleware');

// API routing for the REST-endpoints under /api
const authApi = require('../apis/auth-api');
router.post('/login', authApi.login);  // Login
router.delete('/login', checkAuthorization, authApi.logout);  // Logout
router.get('/login', authApi.isLoggedIn);  // Check if logged in

router.post('/register', authApi.register);  // User Registration

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization(), userApi.getSelf);  // Get self

const employeeApi = require('../apis/employee-data-api');
router.get('/employee', checkAuthorization(), employeeApi.getEmployeeData);  // Get all employees
router.get('/employee/:id', checkAuthorization(), employeeApi.getOneEmployee);  // Get employee by ID

const bonusApi = require('../apis/performance-report-api');

/**
 * @openapi
 * /performance-record:
 *   post:
 *     summary: Save performance record
 *     description: Saves social performance data for a salesman.
 *     requestBody:
 *       description: Performance record data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PerformanceRecord'
 *     responses:
 *       201:
 *         description: Performance record saved successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post('/performance-record', bonusApi.saveSocialPerformance);

/**
 * @openapi
 * /performance-report/{salesManId}/{date}:
 *   get:
 *     summary: Get performance report
 *     description: Retrieves performance report for a specific salesman and date.
 *     parameters:
 *       - in: path
 *         name: salesManId
 *         required: true
 *         schema:
 *           type: string
 *         description: Salesman ID.
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Report year (e.g., 2024-4-3).
 *     responses:
 *       200:
 *         description: Performance report retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PerformanceRecord'
 *       404:
 *         description: Performance report not found.
 */
router.get('/performance-report/:salesManId/:date', bonusApi.getPerformanceReport);

/**
 * @openapi
 * /performance-report/{salesManId}:
 *   get:
 *     summary: Get performance reports by salesman ID
 *     description: Retrieves all performance reports for a specific salesman.
 *     parameters:
 *       - in: path
 *         name: salesManId
 *         required: true
 *         schema:
 *           type: string
 *         description: Salesman ID.
 *     responses:
 *       200:
 *         description: Performance reports retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PerformanceRecord'
 *       404:
 *         description: Performance reports not found.
 */
router.get('/performance-report/:salesManId', bonusApi.getPerformanceReport);

/**
 * @openapi
 * /performance-report:
 *   put:
 *     summary: Update performance report bonus
 *     description: Updates the calculated bonus in a performance report.
 *     requestBody:
 *       description: Updated bonus information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salesManId:
 *                 type: string
 *                 description: Salesman ID.
 *               date:
 *                 type: integer
 *                 description: Report year.
 *               calculatedBonus:
 *                 type: number
 *                 description: New calculated bonus amount.
 *             required:
 *               - salesManId
 *               - date
 *               - calculatedBonus
 *     responses:
 *       200:
 *         description: Performance report bonus updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Performance report not found.
 */
router.put('/performance-report', bonusApi.updatePerformanceReportBonus);

/**
 * @openapi
 * /performance-report/{salesManId}/{date}:
 *   put:
 *     summary: Update performance report
 *     description: Updates a performance report for a specific salesman and date.
 *     parameters:
 *       - in: path
 *         name: salesManId
 *         required: true
 *         schema:
 *           type: string
 *         description: Salesman ID.
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: integer
 *         description: Report year.
 *     requestBody:
 *       description: Performance report data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PerformanceRecord'
 *     responses:
 *       200:
 *         description: Performance report updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Performance report not found.
 */
router.put('/performance-report/:salesManId/:date', bonusApi.updatePerformanceReport);

/**
 * @openapi
 * /performance-report/{salesManId}/{date}:
 *   delete:
 *     summary: Delete performance report
 *     description: Deletes a performance report for a specific salesman and date.
 *     parameters:
 *       - in: path
 *         name: salesManId
 *         required: true
 *         schema:
 *           type: string
 *         description: Salesman ID.
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: integer
 *         description: Report year.
 *     responses:
 *       200:
 *         description: Performance report deleted successfully.
 *       404:
 *         description: Performance report not found.
 */
router.delete('/performance-report/:salesManId/:date', bonusApi.deletePerformanceReport);

const orderApi = require('../apis/order-data-api');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 */
router.get('/orders', orderApi.getOrderData);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Returns a specific order by order-id
 *     description: Retrieves a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID.
 *     responses:
 *       200:
 *         description: An array of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/orders/:id', orderApi.getOrderData);

router.get('/orders-evaluation', orderApi.getOrdersEvaluationData);


const accountApi = require('../apis/account-data-api');

/**
 * @openapi
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     description: Retrieves a list of all accounts.
 *     responses:
 *       200:
 *         description: Accounts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.get('/accounts', accountApi.getAccountData);

/**
 * @openapi
 * /accounts/{id}:
 *   get:
 *     summary: Get a specific account by ID
 *     description: Retrieves data for a specific account by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found.
 */
router.get('/accounts/:id', accountApi.getAccountData);

const productApi = require('../apis/product-data-api');

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get product data by ID
 *     description: Retrieves data for a specific product by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
router.get('/products/:id', productApi.getProductData);

const positionApi = require('../apis/position-api');

/**
 * @openapi
 * /positions/{id}:
 *   get:
 *     summary: Get position data by Sales Order ID (SOID)
 *     description: Retrieves position data by the Sales Order ID (SOID).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sales Order ID
 *     responses:
 *       200:
 *         description: Position data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
 *       404:
 *         description: Position not found.
 */
router.get('/positions/:id', positionApi.getPositionData);  // Works only with SOID




module.exports = router;
