const {fetchOrders} = require('../services/order-service');


/**
 * Fetches order data by ID and sends the result in the response.
 *
 * @param {Request} req - The request object containing the order ID in req.params.id.
 * @param {Response} res - The response object used to send the fetched data or an error message.
 *
 */

const getOrderData = async function (req, res) {
    const id = req.params.id;
    try {
        const fetchedOrders = await fetchOrders(id)
        res.send(fetchedOrders);
    } catch(error) {
        return res.status(400).send({success: false, error: {message: "Couldn't find order with this ID."}});
    }
}

module.exports = {
    getOrderData
}