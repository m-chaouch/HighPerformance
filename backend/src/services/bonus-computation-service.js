const { SocialPerformance } = require('../models/SocialPerformance');
const { PerformanceRecord } = require('../models/PerformanceRecord');
const collectionName = 'sales_man'; // Consider using snake_case for consistency

/**
 * Calculates the bonus based on actual and target social skill points.
 * 
 * @param {Object} criterion - Object containing actual and target values.
 * @param {Object} config - Configuration object containing bonus factors.
 * @returns {number} - The calculated bonus.
 * @throws {Error} - Throws an error if actual or target is not a number.
 */
function defaultCalculation(criterion = { actual: 0, target: 0 }, config = { bonusFactor: 25, additionalBonus: 20 }) {
    const { actual, target } = criterion;
    const { bonusFactor, additionalBonus } = config;

    if (typeof actual !== 'number' || typeof target !== 'number') {
        throw new Error('Actual and target must be numbers.');
    }

    let bonus = target * bonusFactor;
    if (actual > target) {
        bonus += (actual - target) * additionalBonus;
    }

    return bonus;
}

/**
 * Computes the bonus for a performance report.
 * 
 * @param {SocialPerformance} socialPerformanceInstance - Instance of SocialPerformance class.
 * @param {Function} calculation - Bonus calculation function.
 * @returns {Object} - Object containing bonuses for each criterion and total bonus.
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
 * @param {number} date - The date for the report.
 * @returns {Promise<Object>} - Resolves with the performance report.
 * @throws {Error} - Throws an error if there is an issue with retrieving the report.
 */
async function getPerformanceReport(db, salesManId, date) {
    try {
        const collection = db.collection(collectionName);
        const query = { salesManId, date };
        const report = await collection.findOne(query);

        if (!report) {
            throw new Error('Performance report not found.');
        }

        // Assuming report.SocialPerformance is an object, create a new instance of SocialPerformance
        const socialPerformanceInstance = report.socialPerformance;
        console.log(report); //TODO turn this off when done testing
        console.log(socialPerformanceInstance);
        report.bonus = bonusComputation(socialPerformanceInstance);
        return report;
    } catch (error) {
        console.error('Error retrieving performance report:', error);
        throw error;
    }
}

/**
 * Updates a performance report for a given salesperson and date.
 * 
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {number} date - The date for the report.
 * @param {Object} updateFields - The fields to update.
 * @param {Object} [options] - Additional options for the update operation.
 * @returns {Promise<Object>} - Resolves with the result of the update operation.
 * @throws {Error} - Throws an error if there is an issue with updating the report.
 */
async function updatePerformanceReport(db, salesManId, date, updateFields, options = { upsert: false }) {
    try {
        const collection = db.collection(collectionName);
        const update = { $set: updateFields };

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

module.exports = {
    bonusComputation,
    updatePerformanceReport,
    getPerformanceReport,
    storePerformanceRecord,
    defaultCalculation
};
