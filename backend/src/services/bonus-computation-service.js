// Imports only necessary utilities
const { readRatingConversion } = require('../utils/helper');
const{ PerformanceRecord } = require('../models/PerformanceRecord')
const { SocialPerformance } = require('../models/SocialPerformance'); // Correct import statement
const { SalesPerformance } = require('../models/SalesPerformance')

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
 */
function defaultCalculationSocial(criterion = { actual: 0, target: 0 }, config = { bonusFactor: 25, additionalBonus: 20 }) {
    const { actual, target } = criterion;
    const { bonusFactor, additionalBonus } = config;
    return actual <= target ? actual * bonusFactor : target * bonusFactor + (actual - target) * additionalBonus;
}

/**
 * Calculates sales bonuses based on rating and sold quantity.
 *
 * @param {Object} details - Contains rating and sold quantity.
 * @param {string} details.rating - The rating associated with sales performance.
 * @param {number} details.soldQuantity - The quantity of items sold.
 * @returns {number} - Calculated sales bonus.
 */
function defaultCalculationSales({ rating, soldQuantity }) {
    const converter = readRatingConversion();
    return converter[rating] * soldQuantity;
}

/**
 * Computes the bonus for a performance report based on criteria from sales and social performances.
 *
 * @param {SocialPerformance} socialPerformance - Data for social performance calculations.
 * @param {SalesPerformance} salesPerformance - Data for sales performance calculations.
 * @param {Object} calculation - Specific calculation functions for each type of performance.
 * @returns {Object} - Contains bonuses for each criterion and the total bonus.
 */
function bonusComputation(socialPerformance, salesPerformance, calculation = { socialCal: defaultCalculationSocial, salesCal: defaultCalculationSales }) {
    const { socialCal, salesCal } = calculation;
    var socialBonus = {}, socialTotal = 0;
    var salesBonus = {}, salesTotal = 0;
    console.log("hallo ", socialPerformance);
    console.log("hallo ", salesPerformance);
    if (socialPerformance) {
        // Ensure you are accessing the correct property structure
        Object.keys(socialPerformance).forEach(key => {
            console.log(key);
            let tmp = socialCal(socialPerformance[key]);
            socialBonus[key] = tmp;
            socialTotal += tmp;
        });
        socialBonus.total = socialTotal;
    }

    if (salesPerformance) {
        const salesList = salesPerformance.getSalesList(); // Properly reference the sales list
        Object.keys(salesList).forEach(key => {
            let tmp = salesCal(salesList[key]); // Correct data access
            salesBonus[key] = tmp;
            salesTotal += tmp;
        });
        salesBonus.total = salesTotal;
    }

    let totalBonus = { sum: socialTotal + salesTotal };
    return { socialBonus, salesBonus, totalBonus };
}


module.exports = {
    bonusComputation
}

