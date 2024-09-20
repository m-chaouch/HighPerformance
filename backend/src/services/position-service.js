const {getLastSegment} = require('../utils/helper');
const {loginService} = require("./login-service");
const {fetchProducts} = require('./product-service');
const {CRX_URL} = require("../utils/SaaSURLs");


/**
 * Retrieves position data for a given Sales Order ID (SOID) from the OpenCRX system.
 *
 * This function makes an HTTP request to the OpenCRX REST API to fetch position information
 * related to the specified Sales Order ID. It then processes this data using the `filterPositions`
 * function to obtain the required details and returns the result.
 *
 * @param {string} SOID - The Sales Order ID for which positions are to be retrieved.
 *                        This is used to specify which sales order's positions are being queried.
 * @returns {Promise<object[]>} A promise that resolves to an object containing:
 *   - `positions`: An array of position objects associated with the specified Sales Order ID.
 *
 */
async function fetchPositions(SOID){
    let responseData;
    try{
        responseData = await loginService(CRX_URL +
            `opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${SOID}/position`
        );
    } catch (error) {
        if (error.response) {
            if (error.response.status === 500) {
                throw new Error('Something went wrong on the server.');
            } else {
                throw new Error(`Request failed with status ${error.response.status}`);
            }
        } else {
            throw new Error('Network or unknown error occurred.');
        }
    }
    return await filterPositions(responseData)
}

/**
 * Transforms raw position data into a structured format with product details.
 *
 * This function processes the raw position data from an API response to extract and format
 * relevant information about each position. It also fetches additional product information
 * asynchronously for each position.
 *
 * @param {object} responseData - The raw response data containing position information.
 * @returns {Promise<object[]>}  an array of formatted position objects, each containing:
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
async function filterPositions(responseData) {
    if (!responseData || !responseData.objects) {
        return [];
    } else {
        const positionPromises = responseData.objects.map(async position => ({
            positionID: getLastSegment(position.identity),
            positionNumber: position.positionNumber,
            productID: getLastSegment(position.product['@href']),
            products: await fetchProducts(getLastSegment(position.product['@href'])),
            productDescription: position.productDescription,
            quantity: Number(position.quantity),
            pricePerUnit: Number(position.pricePerUnit),
            baseAmount: Number(position.baseAmount),
            taxAmount: Number(position.taxAmount),
            amount: Number(position.amount)
        }));
        return await Promise.all(positionPromises);     // wait for all promises. Bc of the "(async position =>..." map returns an array of promises we have to wait for.
    }

}

module.exports = {
    fetchPositions
}
