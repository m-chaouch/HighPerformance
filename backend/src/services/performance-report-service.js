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
        performanceRecord.calculatedBonus = bonusComputation(performanceRecord.socialPerformance, performanceRecord.salesPerformance);
        console.log(performanceRecord.calculatedBonus);
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
 * @param {mongoDb} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {number} date - The year for the report.
 * @returns {Promise<PerformanceRecord>} - Resolves with the performance report.
 * @throws {Error} - Throws an error if there is an issue with retrieving the report.
 */
async function getPerformanceReport(db, salesManId) {
    try {
        const collection = db.collection(collectionName);

        console.log("id: ",salesManId); // TODO remove after testing
        const report = await collection.findOne(salesManId);

        if (!report) {
            throw new Error('Performance report not found.');
        }
        return report;
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
 * Updates a performance report for a given salesperson and date.
 * This method is a general way to update somthing of an peformance report
 *
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {number} date - The year for the report.
 * @param {Object} updateFields - The fields to update.
 * @param {Object} [options={ upsert: false }] - Additional options for the update operation. Defaults to `{ upsert: false }`.
 * @returns {Promise<Reply>} - An object containing details about the execution of the updateOne operation.
 * @throws {Error} - Throws an error if there is an issue with updating the report.
 */
async function updatePerformanceReport(db, salesManId, date, updateFields, options = { upsert: false }) {
    try {
        const collection = db.collection(collectionName);

        var report = await getPerformanceReport(db, salesManId);
        for( key in updateFields){
            report = updateObject(key, updateFields[key], report)
        }
        report.calculatedBonus = bonusComputation(report.socialPerformance, report.salesPerformance);
        update = { $set:{} }
        update.$set = report;


        return  collection.updateOne({salesManId, date}, update, { upsert: true });
    } catch (error) {
        console.error('Error updating performance report:', error);
        throw error;
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

async function getAllPerformanceReports(db) {
    return await db.collection(collectionName).find({}).toArray();
}


module.exports = {
    storePerformanceRecord,
    getPerformanceReport,
    updatePerformanceReport,
    updateSocialCriteria,
    getAllPerformanceReports
}



