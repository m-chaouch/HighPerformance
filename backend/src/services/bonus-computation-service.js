const { socialPerformance } = require('../apis/bonus-computaion-api');
const { SocialPerformance } = require('../models/SocialPerformance');
const collectionName = 'sales-man';

/**
 * Calculates the bonus based on actual and target social skill points.
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

    return totalBonus;
}

/**
 * Stores a performance report in the database.
 */
function storePerformanceReport(db, performanceReport) {
    const collection = db.collection(collectionName);
    collection.insertOne(performanceReport);
}

/**
 * Computes the bonus from a social performance and stores the performance report including the bonus in the database.
 */
function processBonusAndStore(db, salesManId, socialPerformance, date = new Date().getFullYear()) {
    const performanceReport = {
        salesManId: salesManId,
        socialPerformance: socialPerformance.getSocialPeformance(),
        bonus: bonusCalculator(performanceRecord),
        date: date
    };
    storePerformanceReport(db, performanceReport);
    return performanceReport
}

/**
 * Updates a performance report for a given salesperson and date.
 */
async function updatePerformanceReport(db, salesManId, updateFields, options = { upsert: false }, date = new Date()) {
    const collection = db.collection(collectionName);

    const query = { salesManId: salesManId, date: date };

    const result = await collection.updateOne(query, { $set: updateFields }, options);
    if (result.matchedCount > 0 && result.modifiedCount > 0) {
        console.log('Successfully updated the document.');
    } else if (result.matchedCount > 0 && result.modifiedCount === 0) {
        console.log('No changes were made to the document.');
    } else {
        console.log('No document matched the query.');
    }
    return result;
}

/**
 * Retrieves a performance report for a given salesperson and date.
 */
async function getPerformanceReport(db, salesManId, date = new Date()) {
    const collection = db.collection(collectionName);

    const query = { salesManId: salesManId, date: date };

    const result = await collection.findOne(query);
    return result;
}

exports.bonusComputation = bonusComputation;
exports.processBonusAndStore = processBonusAndStore;
exports.updatePerformanceReport = updatePerformanceReport;
exports.getPerformanceReport = getPerformanceReport;
