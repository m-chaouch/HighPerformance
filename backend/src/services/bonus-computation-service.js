const { SocialPerformance } = require('../models/SocialPerformance');
const { PerformanceRecord } = require('../models/PerformanceRecord');
const collectionName = 'sales_man'; // Consider using snake_case for consistency

/**
 * Calculates the bonus based on actual and target social skill points.
 * 
 * @param {Object} criterion - Object containing actual and target values.
 * @param {number} criterion.actual - The actual value achieved.
 * @param {number} criterion.target - The target value to be achieved.
 * @param {Object} [config] - Configuration object containing bonus factors.
 * @param {number} [config.bonusFactor=25] - The base factor for calculating the bonus.
 * @param {number} [config.additionalBonus=20] - The additional bonus for exceeding the target.
 * @returns {number} - The calculated bonus.
 * @throws {Error} - Throws an error if actual or target is not a number.
 */
function defaultCalculation(criterion = { actual: 0, target: 0 }, config = { bonusFactor: 25, additionalBonus: 20 }) {
    const { actual, target } = criterion;
    const { bonusFactor, additionalBonus } = config;

    if (actual < 0  && target < 0) {
        throw new Error('Actual and target must be greater than 0.');
    }
    
    let bonus;
    if(actual <= target){
        bonus = actual * bonusFactor;
    }else{
        bonus = target * bonusFactor;
        bonus += (actual - target) * additionalBonus;
    }



    return bonus;
}

/**
 * Computes the bonus for a performance report based on social performance criteria.
 * 
 * @param {SocialPerformance} socialPerformance - Instance of the SocialPerformance class.
 * @param {Function} [calculation=defaultCalculation] - Bonus calculation function. Defaults to `defaultCalculation`.
 * @returns {Object} - Object containing bonuses for each criterion and the total bonus.
 */
function bonusComputation(socialPerformance, calculation = defaultCalculation) {
    const bonus = {};
    let totalBonus = 0;

    for (const key in socialPerformance) {
        if (Object.prototype.hasOwnProperty.call(socialPerformance, key)) {
            bonus[key] = calculation(socialPerformance[key]);
            totalBonus += bonus[key];
        }
    }

    bonus.totalBonus = totalBonus;
    return bonus;
}

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
 * @returns {Promise<Object>} - Resolves with the performance report.
 * @throws {Error} - Throws an error if there is an issue with retrieving the report.
 */
async function getPerformanceReport(db, salesManId, date) {
    try {
        const collection = db.collection(collectionName);
        const query = {salesManId, date };
        console.log("id: ",salesManId); // TODO remove after testing
        const report = await collection.findOne(query);

        if (!report) {
            throw new Error('Performance report not found.');
        }

        // Retrieve the social performance instance from the report
        const socialPerformanceInstance = report.socialPerformance;
        report.bonus = bonusComputation(socialPerformanceInstance);
        return report;
    } catch (error) {
        console.error('Error retrieving performance report:', error);
        throw error;
    }
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
 * @returns {Promise<Object>} - Resolves with the result of the update operation.
 * @throws {Error} - Throws an error if there is an issue with updating the report.
 */
async function updatePerformanceReport(db, salesManId, date, updateFields, options = { upsert: false }) {
    try {
        const collection = db.collection(collectionName);

        // Prepare the update object
        const update = { $set:{} };
        // Iterate over the keys in updateFields and populate the $set object
        for (const [key, value] of Object.entries(updateFields)) {
            update.$set[key] = value;
        }
        // Perform the update operation
        const result = await collection.updateOne({ salesManId, date }, update, options);

        if (result.matchedCount > 0) {
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
        updateFields[`socialPerformance.${criteria}.actual`] = value;
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
    bonusComputation,
    updateSocialCriteria,
    getPerformanceReport,
    storePerformanceRecord,
    defaultCalculation,
    updatePerformanceReport,
    deletePeformanceReport
};
