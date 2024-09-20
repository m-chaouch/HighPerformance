const {fetchAccounts} = require('../services/account-service');

/**
 * Fetches account data by ID and sends the response.
 *
 * @param {Request} req - Contains the account ID in req.params.id.
 * @param {Response} res - Used to send the data or error response.
 *
 */

const getAccountData = async function (req, res) {
    const id = req.params.id;
    try {
        const fetchedAccounts = await fetchAccounts(id);
        res.send(fetchedAccounts);
    } catch(error) {
        return res.status(404).send({ success: false, error: { message: "Couldn't find account with this ID." } });

    }
}

module.exports = {
    getAccountData
}

