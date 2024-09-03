const { fetchPositions } = require('../services/position-service');

const getPositionData = function (req, res) {
    const id = req.params.id;
    fetchPositions(id).then(positions => {
        res.send(positions);
    }).catch(() => {
        res.status(400).send();
    })
}

module.exports = {
    getPositionData
}