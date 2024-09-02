const {loginService} = require('./login-service');
const{getLastSegment} = require('../utils/helper');
const {getAccountName} = require("./account-service");


/**
 * Fetches sales orders from the OpenCRX system.
 *
 * This function accepts an optional Sales Order ID (SOID).
 * If no SOID is provided, all sales orders will be retrieved.
 *
 * @param {string} [SOID=""] - The Sales Order ID. Optional.
 * @returns {Promise<Object[]>} A promise that resolves to an object containing the orders.
 */
async function fetchOrders(SOID = ""){
    const responseData = await loginService(`https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${SOID}`);
    const orders = await filterOrders(responseData);
    console.log(orders)
    return orders
}

/**
 * Transforms raw order data into a more structured format.
 *
 * This function processes the `responseData` from an API response to extract and format
 * relevant information about each order. It converts raw API data into a simplified object
 * format, including fields like SalesOrderID, contractID, name, customerID, and more.
 *
 * @param {object} responseData - The raw response data containing order information.
 * @returns {Promise<object[]>} A promise that resolves to an array of formatted order objects
 *   with properties:
 *   - SalesOrderID             // Unique identifier for the order
 *   - contractID               // Contract number for the order
 *   - name                     // Name of the order
 *   - customerID               // Unique identifier for the customer
 *   - customerName             // Name of the customer
 *   - totalAmount              // Total amount of the order (excluding tax)
 *   - totalAmountIncludingTax  // Total amount of the order (including tax)
 *   - priority                 // Priority of the order (5: immediate, 4: urgent, 3: high, 2: normal, 1: low, 0: none)
 *   - state                    // State or status of the contract
 *   - sellerID                 // Unique identifier for the sales representative
 *   - sellerName               // Name of the sales representative
 */
async function filterOrders(responseData) {
    let orders;
    if(responseData.objects){
        orders = responseData.objects   // we have an array!
    } else {
        orders = [responseData]     // if responseData.objects is not defined, we dont have an array!
    }

    const orderPromises = orders.map(async order => ({
        SalesOrderID: getLastSegment(order.identity),
        contractID: order.contractNumber,
        name: order.name,
        clientID: getLastSegment(order.customer['@href']),
        clientName: await getAccountName(getLastSegment(order.customer['@href'])),
        totalAmount: order.totalAmount,
        totalAmountIncludingTax: order.totalAmountIncludingTax,
        priority: order.priority,
        state: order.contractState,
        sellerID: getLastSegment(order.salesRep['@href']),        // using the "[]" -Notation bc the @ makes problems with the "." -Notation
        sellerName: await getAccountName(getLastSegment(order.salesRep['@href']))
    }));
    return await Promise.all(orderPromises);
}

module.exports = {
    fetchOrders
}


// toDO:
//       - Verbinden von Orders und Clients?
//       - Angular
