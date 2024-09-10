const {loginService} = require('./login-service');
const {getLastSegment} = require("../utils/helper");
const {CRX_URL} = require("../utils/SaaSURLs");




/**
 * Retrieves account data from the OpenCRX system.
 *
 * This function makes an HTTP request to the OpenCRX REST API to retrieve account information.
 * Depending on whether a Sales Order ID (UID) is provided:
 * - If a UID is specified, it returns a single account object matching that UID.
 * - If no UID is specified, it returns an array of all account objects.
 *
 * @param {string} [UID=""] - The Sales Order ID. If provided, retrieves the specific account with that UID.
 * @returns {Promise<object[]>} A promise that resolves to:
 *   - A single account object if a UID is provided and matched.
 *   - An array of account objects if no UID is provided.
 *   - An empty array if no account is found with the specified UID.
 */
async function fetchAccounts(UID="") {
    const accounts = await loginService(CRX_URL + `opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${UID}`);
    return filterAccounts(accounts);        // returns an array of objects
}

/**
 * Filters the accounts to a specific scheme.
 * Takes the accounts of fetchAccounts and returns the filtered objects in an array
 *
 * @param {Array} accounts - an array of account objects
 *
 * @returns {Array} - An array of objects, each containing the following properties:
 *   - {string} UID - The last segment of the `identity` property of the account.
 *   - {string} industry - The industry of the account. - ONLY Clients have this attribute
 *   - {string} fullName - The full name of the account.
 *   - {string} name - The name of the account.
 *   - {number} numberOfEmployeesCategory - The category of the number of employees.
 *   - {number} ratomg - The accountRating from the Client
 *   - {Object} vcard - The processed vcard information, as returned by the `vcardFilter` function.
 */
function filterAccounts(accounts) {
    if(accounts.objects){
        accounts = accounts.objects;     // is an array now
    } else {
        accounts = [accounts];
    }
    return accounts.map(account => ({
        UID: getLastSegment(account.identity),
        fullName: account.fullName,
        industry: account.industry,
        name: account.name? account.name : '',
        numberOfEmployeesCategory: account.numberOfEmployeesCategory? account.numberOfEmployeesCategory : '',
        rating: account.accountRating,
        vcard: vcardFilter(account.vcard)
    }));
}

/**
 * Filters the vcard String of the account JSON object.
 * Takes the vcard String and returns the vcard as an JSON object.
 *
 * @param {string} vcard
 * @returns {Object} - A JSON object containing the extracted vcard property
 */
function vcardFilter(vcard) {
    vcard = vcard.replace('ADR;WORK','ADR');    // make names better
    vcard = vcard.replace('TEL;WORK;VOICE','TEL');
    const vcardAr = vcard.split('\n');
    const targetKeys = ['UID', 'FN', 'Nickname', 'ORG', 'TITLE', 'TEL', 'ADR']
    let extractedData = {};
    vcardAr.forEach(line => {
        targetKeys.forEach(key => {
            if(line.startsWith(key+':')){
                const value = line.split(':')[1]    // we only want the value, so [1]
                extractedData[key] = value.trim();   // there are some random '\r' in the vcard?!
            }
        })
    })
    if(extractedData.ADR){  // not every User has an Adress!
        extractedData.ADR = vcardAdressFilter(extractedData.ADR);
    } else {
        extractedData.ADR = vcardAdressFilter(";;;;;;")     // = no adress
    }
    return extractedData;
}

/**
 *
 * Parses a vcard address string into a structured object.
 *
 * The address string is expected to be in the format:
 * ;;Street;City;State;Postal Code;Country
 *
 * @param {string} addressString
 * @returns {Object}
 */
function vcardAdressFilter(addressString) {
    const adressAr = addressString.split(';')     // by this i get an array with the length 7 and the addresscomponents
    return {
        STREET: adressAr[2],
        CITY: adressAr[3],
        KANTON: adressAr[4],
        POSTALCODE: adressAr[5],
        COUNTRY: adressAr[6]
    }
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
    return account[0].fullName;     // account is an array and [0] gets the first element of it (its just one Element)
}


module.exports = {
    fetchAccounts,
    getAccountName
}


