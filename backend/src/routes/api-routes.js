const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');



/*
    In this file is the routing for the REST-endpoints under /api managed
 */

router.get('/', (req, res) => {
    res.send('Hello World!');
});



const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization,authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

router.post('/register', authApi.register); // Registration route

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization(), userApi.getSelf);

const peopleDemoApi = require('../apis/people-demo-api');
router.get('/people', checkAuthorization(), peopleDemoApi.getPeople);

const employeeApi = require('../apis/employee-data-api');
router.get('/employee', checkAuthorization(), employeeApi.getEmployeeData);

const orderApi = require ('../apis/order-data-api');
router.get('/orders', orderApi.getOrderData);
router.get('/orders/:id', orderApi.getOrderData);

const accountApi = require('../apis/account-data-api');
router.get('/accounts', accountApi.getAccountData);
router.get('/accounts/:id', accountApi.getAccountData);

const productApi = require('../apis/product-data-api');
router.get('/products', productApi.getProductData);
router.get('/products/:id', productApi.getProductData);

const positionApi = require('../apis/position-api');
router.get('/positions/:id', positionApi.getPositionData);  // works only with SOID





module.exports = router;