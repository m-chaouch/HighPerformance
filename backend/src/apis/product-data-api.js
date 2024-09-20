const { fetchProducts } = require('../services/product-service');

/**
 * Fetches product data by ID and sends it in the response.
 *
 * @param {Request} req - Request object containing the product ID in req.params.id.
 * @param {Response} res - Response object to send the fetched data or error.
 */

const getProductData = async function (req, res) {
    const id = req.params.id;
    try {
        const fetchedProducts = await fetchProducts(id);
        res.send(fetchedProducts);
    } catch(error) {
        return res.status(404).send({ success: false, error: { message: "Couldn't find product with this ID." } });
    }

}

module.exports = {
    getProductData
}