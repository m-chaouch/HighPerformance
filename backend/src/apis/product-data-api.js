const { fetchProducts } = require('../services/product-service');

const getProductData = function (req, res) {
    const id = req.params.id;
    fetchProducts(id).then(productData => {
        res.send(productData);
    }).catch(() => {
        res.status(400).send();
    })
}

module.exports = {
    getProductData
}