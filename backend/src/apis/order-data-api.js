const {fetchOrders} = require('../services/order-service');


/**
 *
 * @param req
 * @param res
 */

const getOrderData = function (req, res) {
    const id = req.params.id;
    fetchOrders(id).then(orderData => {

        res.send(orderData);
    }).catch( () => {
        res.status(400).send();
    });
}

module.exports = {
    getOrderData
}