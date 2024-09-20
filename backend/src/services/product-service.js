const {loginService} = require("./login-service");
const {CRX_URL} = require("../utils/SaaSURLs");


/**
 * Retrieves product data from the OpenCRX system.
 *
 * This function makes an HTTP request to the OpenCRX REST API to fetch product information.
 * The behavior of the function depends on whether a Product ID (PID) is provided:
 * - If a PID is specified, it retrieves and returns the specific product object matching that PID.
 * - If no PID is specified, it returns an array of all product objects.
 *
 * @param {string} [PID=""] - The Product ID. If provided, retrieves the specific product with that PID.
 *                            If not provided, retrieves all products.
 * @returns {Promise<object[]>} A promise that resolves to:
 *   - A single product object if a PID is provided and matched.
 *   - An array of product objects if no PID is provided.
 *   - An empty array if no products are found and no PID is specified.
 */
async function fetchProducts(PID) {
    let products;
    try {
        products = await loginService(CRX_URL +
            `/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/${PID}`
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

        return filterProducts(products);
     // Return an array of all product objects if no PID is provided
}

/**
 *
 * @param {object[]} products - raw response data containing products information.
 * @returns {{minQuantity: *, maxQuantity: *, name: *, productNumber: *}[]}
 */

function filterProducts(products) {
    if(!Array.isArray(products)){
        products = [products]
    }
    return products.map(product => ({
        name: product.name,
        productNumber: product.productNumber,
        minQuantity: product.minQuantity,
        maxQuantity: product.maxQuantity
    }))
}

/**
 * Retrieves the name of the product with the specified Product ID (PID).
 *
 * @param {string} PID - The Product ID of the product.
 * @returns {Promise<string>} A promise that resolves to the product's name.
 */
async function getProductName(PID) {
    const products = await fetchProducts(PID);
    return products.name;
}


module.exports = {
    fetchProducts
}