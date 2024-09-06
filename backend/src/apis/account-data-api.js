const {fetchAccounts} = require('../services/account-service');


const getAccountData = function (req, res) {
    const id = req.params.id;
    fetchAccounts(id).then(accountData => {
        res.send(accountData);
    }).catch(() => {
        res.status(400).send();
    })
}

module.exports = {
    getAccountData
}

