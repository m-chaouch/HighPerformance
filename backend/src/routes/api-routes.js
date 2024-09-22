const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');



/*
    In this file is the routing for the REST-endpoints under /api managed
 */



const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization,authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

router.post('/register', authApi.register); // Registration route

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization(), userApi.getSelf);


const employeeApi = require('../apis/employee-data-api');
router.get('/employee', checkAuthorization(), employeeApi.getEmployeeData);
router.get('/employee/:id', checkAuthorization(), employeeApi.getOneEmployee); //needs employeeID not code

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
 *           type: integer
 *         description: Report year (e.g., 2023).
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


const orderApi = require ('../apis/order-data-api');

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Returns all orders
 *     description: Retrieves an array of all orders from the database.
 *     responses:
 *       200:
 *         description: An array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/orders', orderApi.getOrderData);

/**
 * @openapi
 * /order:
 *   get:
 *     summary: Returns a specific order by order-id
 *     description: Retrieves an array of all orders from the database.
 *     responses:
 *       200:
 *         description: An array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/orders/:id', orderApi.getOrderData);

const accountApi = require('../apis/account-data-api');

router.get('/accounts', accountApi.getAccountData);
router.get('/accounts/:id', accountApi.getAccountData);

const productApi = require('../apis/product-data-api');
router.get('/products/:id', productApi.getProductData);

const positionApi = require('../apis/position-api');


router.get('/positions/:id', positionApi.getPositionData);  // works only with SOID





module.exports = router;
