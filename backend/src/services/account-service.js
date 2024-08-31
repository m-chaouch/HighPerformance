const {loginService} = require('./login-service');


/**
 * Retrieves account data from the OpenCRX system.
 *
 * This function makes an HTTP request to the OpenCRX REST API to retrieve account information.
 * Depending on whether a Sales Order ID (UID) is provided:
 * - If a UID is specified, it returns a single account object matching that UID.
 * - If no UID is specified, it returns an array of all account objects.
 *
 * @param {string} [UID=""] - The Sales Order ID. If provided, retrieves the specific account with that UID.
 * @returns {Promise<object|object[]>} A promise that resolves to:
 *   - A single account object if a UID is provided and matched.
 *   - An array of account objects if no UID is provided.
 *   - An empty array if no account is found with the specified UID.
 */
async function fetchAccounts(UID="") {
    const accounts = await loginService(`https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${UID}`);
    if(UID){
        return accounts;    // returns the specific account as an object if UID defined
    }
    return accounts.objects;        // returns an array of objects if UID not defined
}


/**
 * Retrieves the full name of an account based on the given UID.
 *
 * This function uses the `fetchAccounts` function to retrieve account information.
 * It then returns the full name of the account associated with the specified UID.
 *
 * @param {string} UID - The unique identifier for the account. Must be provided to fetch the specific account.
 * @returns {Promise<string>} A promise that resolves to the full name of the account associated with the given UID.
 *   If no account is found with the given UID, this will return `undefined`.
 */
async function getAccountName(UID) {
    const account = await fetchAccounts(UID);
    return account.fullName;     // account is an array and [0] gets the first element of it (its just one Element)
}


module.exports = {
    fetchAccounts,
    getAccountName
}


