const {loginService} = require('./login-service');
const{getLastSegment} = require('../utils/helper');


/**
 * Fetches sales orders from the OpenCRX system.
 *
 * This function accepts an optional Sales Order ID (SOID).
 * If no SOID is provided, all sales orders will be retrieved.
 *
 * @param {string} [SOID=""] - The Sales Order ID. Optional.
 * @returns {Promise<{orders: object[]}>} A promise that resolves to an object containing the orders.
 */
async function fetchOrders(SOID = ""){
    const responseData = await loginService(`https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${SOID}`);
    const orders = await filterOrders(responseData);
    return {
        orders
    }
}

/**
 * Transforms raw order data into a more structured format.
 *
 * This function processes the `responseData` from an API response to extract and format
 * relevant information about each order. It converts raw API data into a simplified object
 * format, including fields like SalesOrderID, contractNumber, customerID, and more.
 *
 * @param {object} responseData - The raw response data containing order information.
 * @returns {object[]} An array of formatted order objects with properties:
 *   - SalesOrderID
 *   - contractNumber
 *   - name
 *   - customerID
 *   - totalAmount
 *   - totalAmountIncludingTax
 *   - priority     ||  5: immediate, 4: Urgent , 3: High, 2: Normal, 1: Low , 0: None
 *   - state        || ???
 *   - sellerID
 */
function filterOrders(responseData){
    return responseData.objects.map(order => ({
        SalesOrderID : getLastSegment(order.identity),
        contractNumber: order.contractNumber,
        name: order.name,
        customerID: getLastSegment(order.customer['@href']),
        totalAmount: order.totalAmount,
        totalAmountIncludingTax: order.totalAmountIncludingTax,
        priority: order.priority,
        state: order.contractState,
        sellerID: getLastSegment(order.salesRep['@href'])        // using the "[]" -Notation bc the @ makes problems with the "." -Notation
    }))
}


module.exports = {
    fetchOrders
}


// toDO:
//       - Verbinden von Orders und Clients?
//       - Angular
