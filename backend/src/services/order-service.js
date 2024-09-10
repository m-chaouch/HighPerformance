const {loginService} = require('./login-service');
const{getLastSegment} = require('../utils/helper');
const {getAccountName} = require("./account-service");
const {CRX_URL} = require("../utils/SaaSURLs");


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
    const responseData = await loginService(CRX_URL + `opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${SOID}`);
    return await filterOrders(responseData);
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
 *   - activeOn                 // date as a string
 *   - expiresOn                // date as a string
 *   - contractCurrency
 *   - pricingRule
 *   - pricingState             // (20:Ok, 10:Neuberechnung notwendig, 0: none)
 *   - calcRule                 //
 *   - priority                 // Priority of the order (5: immediate, 4: urgent, 3: high, 2: normal, 1: low, 0: none)
 *   - state                    // State or status of the contract (0: none / 420: Active / 1410: Geschlossen / gewonnen oder nächste Stufe)
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
        totalAmount: Number(order.totalAmount),
        totalAmountIncludingTax: Number(order.totalAmountIncludingTax),
        activeOn: order.activeOn,
        expiresOn: order.expiresOn,
        contractCurrency: getCurrency(order.contractCurrency),
        pricingRule: order.pricingRule?.['@href'] ? getLastSegment(order.pricingRule['@href']) : null,  // bc sometimes pricingRule is not defined!!
        pricingState: getPricingState(order.pricingState),
        calcRule: order.calcRule?.['@href'] ? getLastSegment(order.calcRule['@href']) : null,       // bc sometimes calcRule is not defined!!
        priority: order.priority,
        state: getState(order.contractState),
        sellerID: getLastSegment(order.salesRep['@href']),        // using the "[]" -Notation bc the @ makes problems with the "." -Notation
        sellerName: await getAccountName(getLastSegment(order.salesRep['@href']))
    }));
    return await Promise.all(orderPromises);
}


/**
 * Returns currency to the corresponding number.
 *
 * @param {number} currencyNumber
 * @returns {string}
 */
function getCurrency(currencyNumber) {
    const CurrencyNumberObject = {978: 'EUR'};     // add missing currencies here
    return CurrencyNumberObject[currencyNumber];
}

// 0: none / 420: Active / 1410: Geschlossen / gewonnen oder nächste Stufe
/**
 * Returns contractstate to the corresponding number.
 *
 * @param {number} contractState
 * @returns {string}
 */
function getState(contractState){
    const StateObject= {0: 'none', 420: 'Active', 1410: 'Closed / won or next step'} ;       // add missing states here
    return StateObject[contractState];
}

/**
 * Returns pricingstate to the corresponding number.
 *
 * @param {number} pricingState
 * @returns {string}
 */
function getPricingState(pricingState) {
    const PricingStateObject = {0: 'none', 10: 'Recalculation necessary', 20: 'Ok'};        // add missing pricingstates here
    return PricingStateObject[pricingState];
}
module.exports = {
    fetchOrders
}