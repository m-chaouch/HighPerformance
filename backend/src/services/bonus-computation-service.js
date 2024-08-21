const { SocialPerformance } = require('../models/SocialPerformance');

/**
 * Calculates the bonus based on actual and target social skill points.
 * 
 * @param {Object} criterion - The criteria for the calculation.
 * @param {number} criterion.actual - The actual skill points achieved.
 * @param {number} criterion.target - The target skill points.
 * @param {Object} [config={ bonusFactor: 25, additionalBonus: 20 }] - Configuration object for the calculation.
 * @param {number} [config.bonusFactor=25] - The bonus factor per skill point.
 * @param {number} [config.additionalBonus=20] - The bonus factor for exceeding the target.
 * @returns {number} - The calculated bonus.
 */
function defaultCalculation(criterion = { actual: 0, target: 0 }, config = { bonusFactor: 25, additionalBonus: 20 }) {
    const { actual, target } = criterion;
    const { bonusFactor, additionalBonus } = config;

    let bonus = target * bonusFactor;
    if (actual > target) {
        bonus += (actual - target) * additionalBonus;
    }

    return bonus;
}

/**
 * Computes the bonus for a performance report.
 * 
 * @param {SocialPerformance} socialPerformance - The instance of SocialPerformance class.
 * @param {Function} [calculation=defaultCalculation] - The calculation function to use.
 * @returns {Object} - The computed bonuses for each criterion and the total bonus.
 */
function bonusComputation(socialPerformance, calculation = defaultCalculation) {
    const performanceReport = socialPerformance.getSocialPeformance();
    const bonus = {};
    let totalBonus = 0;

    for (let key in performanceReport) {
        if (performanceReport.hasOwnProperty(key)) {
            bonus[key] = calculation(performanceReport[key]);
            totalBonus += bonus[key];
        }
    }

    bonus['total'] = totalBonus;
    return bonus;
}

/**
 * Stores a performance report in the database.
 * 
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {Object} performanceRecord - The performance record data (e.g., social and sales performance).
 * @param {Object} bonus - The calculated bonus based on the performance.
 * @param {Date | string} [date=new Date().getFullYear()] - The date of the performance report.
 * @returns {Promise} - A promise that resolves once the report is stored.
 */
async function storePerformanceReport(db, salesManId, performanceRecord, bonus, date = new Date().getFullYear()) {
    const collection = db.collection('sales-man');

    const document = {
        salesManId: salesManId,
        performanceRecord: performanceRecord,
        bonus: bonus,
        date: date
    };

    await collection.insertOne(document);
    return document;
}

/**
 * Computes the bonus from a social performance and stores the performance report including the bonus in the database.
 * 
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {SocialPerformance} socialPerformance - The social performance data.
 * @returns {Promise} - Returns the performance record, including the calculated bonus.
 */
async function processBonusAndStore(db, salesManId, socialPerformance) {
    const bonus = bonusComputation(socialPerformance);
    return await storePerformanceReport(db, salesManId, socialPerformance, bonus);
}

/**
 * Updates a performance report for a given salesperson and date.
 * 
 * @param {Object} db - The database connection object.
 * @param {string} salesManId - The ID of the salesperson.
 * @param {Object} updateFields - The fields to update in the performance report.
 * @param {Object} [options={ upsert: false }] - Additional options for the update operation.
 * @param {Date | string} [date=new Date()] - The date of the report to update.
 * @returns {Object} - The result of the update operation.
 */
async function updatePerformanceReport(db, salesManId, updateFields, options = { upsert: false }, date = new Date()) {
    const collection = db.collection('sales-man');

    const query = { salesManId: salesManId, date: date };

    const result = await collection.updateOne(query, { $set: updateFields }, options);
    return result;
}

/**
 * Example usage:
 * 
 * const updateFields = {
 *   'performanceRecord.socialPerformance.communicationSkills.actual': 5,
 *   'bonus.total': 2000
 * };
 * 
 * const result = await updatePerformanceReport(db, 'salesman123', updateFields);
 * console.log('Update Result:', result);
 */

exports.bonusComputation = bonusComputation;
exports.processBonusAndStore = processBonusAndStore;
exports.updatePerformanceReport = updatePerformanceReport;

