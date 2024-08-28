const {fetchOrders} = require('../services/order-service');


/**
 *
 * @param req
 * @param res
 */

const getOrderData = function (req, res) {
    fetchOrders().then(orderData => {
        res.send(orderData); // order data hat keinen inhalt
    }).catch( () => {
        res.status(400).send();
    });
}

module.exports = {
    getOrderData
}