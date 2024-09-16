const {getEmployeeService} = require('../services/employee-data-service') ;
const {fetchProducts} = require("../services/product-service");
const {fetchAccounts} = require("../services/account-service");
const {fetchPositions} = require("../services/position-service");
let {SocialPerformance} = require("../models/SocialPerformance");
const {fetchOrders, getOrdersOfEmployee} = require("../services/order-service");
const {SalesPerformance} = require("../models/SalesPerformance");



//
// /**
//  * creates an Performance Report for ONE salesman
//  *
//  * @param db
//  * @param salesmanId (the governmentId of the salesman
//  * @returns {Promise<void>}
//  */
// async function perfReportBuilder(db, salesmanId) {
//
// }
//
// // function salesPerformanceBuilder(salesmanID){
// //     const salesPerformance = new SalesPerformance();
// //     const orders
//     salesPerformance.addCompanyToList()
// }

// test()

module.exports = {
    // perfReportBuilder
}