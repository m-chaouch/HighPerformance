const {getLastSegment} = require('../utils/helper');
const {loginService} = require("./login-service");
const {getProductName} = require('./product-service');


/**
 * Retrieves position data for a given Sales Order ID (SOID) from the OpenCRX system.
 *
 * This function makes an HTTP request to the OpenCRX REST API to fetch position information
 * related to the specified Sales Order ID. It then processes this data using the `filterPositions`
 * function to obtain the required details and returns the result.
 *
 * @param {string} SOID - The Sales Order ID for which positions are to be retrieved.
 *                        This is used to specify which sales order's positions are being queried.
 * @returns {Promise<{positions: object[]}>} A promise that resolves to an object containing:
 *   - `positions`: An array of position objects associated with the specified Sales Order ID.
 *
 */
async function fetchPositions(SOID){
    const responseData = await loginService(`https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${SOID}/position`)
    const positions = await filterPositions(responseData);
    return {
        positions
    }
}


/**
 * Transforms raw position data into a structured format with product details.
 *
 * This function processes the raw position data from an API response to extract and format
 * relevant information about each position. It also fetches additional product information
 * asynchronously for each position.
 *
 * @param {object} responseData - The raw response data containing position information.
 * @returns {Promise<object[]>} A promise that resolves to an array of formatted position objects, each containing:
 *   - positionID
 *   - positionNumber
 *   - productID
 *   - productName (fetched asynchronously)
 *   - productDescription
 *   - quantity
 *   - pricePerUnit
 *   - baseAmount
 *   - taxAmount
 *   - amount
 */
async function filterPositions(responseData){
    const positionPromises = responseData.objects.map(async position => ({
        positionID: getLastSegment(position.identity),
        positionNumber: position.positionNumber,
        productID: getLastSegment(position.product['@href']),
        productName: await getProductName(getLastSegment(position.product['@href'])),
        productDescription: position.productDescription,
        quantity: position.quantity,
        pricePerUnit: position.pricePerUnit,
        baseAmount: position.baseAmount,
        taxAmount: position.taxAmount,
        amount: position.amount
    }));
    return await Promise.all(positionPromises);     // wait for all promises. Bc of the "(async position =>..." map returns an array of promises we have to wait for.
}


module.exports = {
    fetchPositions
}
