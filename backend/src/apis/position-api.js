const { fetchPositions } = require('../services/position-service');


/**
 * Fetches position data by ID and sends it in the response.
 *
 * @param {Request} req - Request object containing the position ID in req.params.id.
 * @param {Response} res - Response object to send the fetched data or error.
 */
const getPositionData = async function (req, res) {
    const id = req.params.id;
    try {
        const fetchedPositions = await fetchPositions(id);
        res.send(fetchedPositions);
    } catch(error) {
        return res.status(404).send({ success: false, error: { message: "Couldn't find position with this ID." } });
    }
}

module.exports = {
    getPositionData
}