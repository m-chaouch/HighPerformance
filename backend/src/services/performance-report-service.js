const { SocialPerformance } = require('../models/SocialPerformance');
const { PerformanceRecord } = require('../models/PerformanceRecord');
const {readRatingConversion,
    updateRatingToNumber,
    readSocialScores,
    updateSocialFactors,
    defaultValueSocialPer} = require('../utils/helper')
const {create} = require("axios");
const {createDB} = require("../../unit-tests/support/mockdb-new");
const {bonusComputation} = require('../../src/services/bonus-computation-service')
// const { getToken, baseUrl } = require('./accessToken-service');
const {getEmployeeData} = require("../services/employee-data-service");
const axios = require("axios");
const qs = require("querystring");



const collectionName = 'Performance_Reports'; // Consider using snake_case for consistency
/**
 * Stores a performance record in the database.
 *
 * @param {Object} db - The database connection object.
 * @param {PerformanceRecord} performanceRecord - The performance record to store.
 * @returns {Promise} - Resolves with the result of the insert operation.
 * @throws {Error} - Throws an error if there is an issue with storing the record.
 */
async function storePerformanceRecord(db, performanceRecord) {
    try {
        const collection = db.collection(collectionName);
        const performanceRecordClone = JSON.parse(JSON.stringify(performanceRecord));   // clone the performanceReport, so the original record doesn't change
        performanceRecord.calculatedBonus = bonusComputation(performanceRecordClone.socialPerformance, performanceRecordClone.salesPerformance);
        //console.log(performanceRecord.calculatedBonus);
        const result = await collection.insertOne(performanceRecord);
        console.log('Performance record stored successfully.');
        return result;
    } catch (error) {
        console.error('Error storing performance record:', error);
        throw error;
    }
}

/**
 * Retrieves a performance report for a given salesperson and date.
 *
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {number} date - The year for the report.
 * @returns {Promise<PerformanceRecord>} - Resolves with the performance report.
 * @throws {Error} - Throws an error if there is an issue with retrieving the report.
 */
async function getPerformanceReport(db, salesManId, date) {
    try {
        const collection = db.collection(collectionName);
        const query= {'salesManId': salesManId}

        if(date){
            query.date = date;
        }
        const report = await collection.find(query).toArray();
        if (!report || report.length === 0) {
            //throw new Error('Performance report not found');
        }
        return report;   // a salesman can have just one performance report (different years)
    } catch (error) {
        console.error('Error retrieving performance report:', error);
        throw error;
    }
}

/**
 * Recursively updates a given key within an object, replacing it with a new value.
 * This function was inspired by Bergi's answer on StackOverflow (https://stackoverflow.com/a/73090193/).
 *
 * @param {string} keyName - The name of the key to update.
 * @param {*} newVal - The new value to assign to the key.
 * @param {object} object - The original object to update.
 * @returns {object} A new object with the updated key and value.
 */
function updateObject(keyName, newVal, object) {
    const results = {};
    for (var key in object) {
        if (key === keyName) {
            results[key] = newVal;
        } else if (typeof object[key] === "object" && object[key] !== null) {
            results[key] = updateObject(keyName, newVal, object[key]);
        } else {
            results[key] = object[key];
        }
    }
    return results;
}


/**
 * @param {Object} db - The database connection object.
 *     @param {string} salesManId - The ID of the salesperson.
 *     @param {number} date - The date for the report.
 *     @param {number} date - The year for the report.
 *     @param {Object} updateFields - The fields to update.
 *     @param {Object} [options] - Additional options for the update operation.
 *     @param {Object} [options={ upsert: false }] - Additional options for the update operation. Defaults to { upsert: false }.
 * @returns {Promise<Object>} - Resolves with the result of the update operation.
 *     @throws {Error} - Throws an error if there is an issue with updating the report.
 */

async function updatePerformanceReport(db, salesManId, date, updateFields, options = { upsert: false }) {
    try {
        const collection = db.collection(collectionName);
        //console.log({ salesManId, date });
        // Prepare the update object
        const update = { $set:{} };
        // Iterate over the keys in updateFields and populate the $set object
        for (const [key, value] of Object.entries(updateFields)) {
            update.$set[key] = value;
        }
        // Perform the update operation
        const result = await collection.updateOne({ salesManId, date }, update, options);

        if (result.matchedCount > 0) {
            await storePerformanceReportInOrangeHRM(db, salesManId, date);
            console.log('Document updated successfully.');
        } else {
            console.log('No document matched the query.');
        }

        return result;
    } catch (error) {
        console.error('Error updating performance report:', error);
        throw error;
    }
}

async function storePerformanceReportInOrangeHRM(db, salesManId, date) {
    try {
        const performanceReport = (await getPerformanceReport(db, salesManId, date))[0];
        //console.log(performanceReport);
        //console.log("CEO: " , performanceReport.isAcceptedByCEO);
        //console.log("HR: " , performanceReport.isAcceptedByHR);
        if (!performanceReport.isAcceptedByCEO || !performanceReport.isAcceptedByHR) {
            console.log('Performance Report is not approved by CEO or HR.');
            return;
        }

        const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
        const body = qs.stringify({
            client_id: 'api_oauth_id',
            client_secret: 'oauth_secret',
            grant_type: 'password',
            username: 'ratschuweit',
            password: '*Safb02da42Demo$'
        });
        const config1 = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        };
        const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config1);
        const accessToken = res.data['access_token'];

            const bonus = performanceReport.calculatedBonus.totalBonus;
            if (!accessToken) {
                throw new Error('Failed to retrieve access token.');
            }


            const employeeId = await getEmployeeData(salesManId);


            // employeeID von x der die selbe salesManId hat
            const url = `${baseUrl}/api/v1/employee/${employeeId}/bonussalary?year=${date}&value=${bonus.sum}`;
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                },
            };


            const response = await axios.post(url,null, config);

            // Überprüfen des Statuscodes der Antwort
            if (response.status !== 200) {
                throw new Error(`Failed to update bonus salary. Status code: ${response.status}`);
            }

            console.log('Performance report successfully stored in OrangeHRM.');
        } catch (error) {
            console.error('Error storing performance report in OrangeHRM:', error.message);
    }
}


/**
 * Updates specific criteria in the social performance of a performance record.
 *
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {number} date - The year for the report.
 * @param {Object} newValues - Contains arrays of criteria names and corresponding new values.
 * @param {string[]} newValues.criterias - Array of criteria names to be updated.
 * @param {number[]} newValues.values - Array of new values corresponding to the criteria.
 * @returns {Promise<Object>} - Resolves with the result of the update operation.
 */
async function updateSocialCriteria(db, salesManId, date, update) {

    const updateFields = {};

    for (const [key, value] of Object.entries(update)) {
        updateFields[key] = {"actual": value, "target": defaultValueSocialPer(key).target };
    }

    // Update the performance report with the new values
    return await updatePerformanceReport(db, salesManId, date, updateFields);
}
async function deletePeformanceReport(db, salesManId, date) {
    const collection = db.collection(collectionName);
    const query = {salesManId, date};
    await collection.deleteOne(query);

}


module.exports = {
    storePerformanceRecord,
    getPerformanceReport,
    updatePerformanceReport,
    updateSocialCriteria
}



