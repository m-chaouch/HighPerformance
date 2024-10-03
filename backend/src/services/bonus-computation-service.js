// Imports only necessary utilities
const { readRatingConversion } = require('../utils/helper');
const { SocialPerformance } = require('../models/SocialPerformance'); // Correct import statement
const { SalesPerformance } = require('../models/SalesPerformance');

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

    // Calculate bonus based on whether actual is below or above the target
    return actual <= target ? actual * bonusFactor : target * bonusFactor + (actual - target) * additionalBonus;
}

/**
 * Calculates sales bonuses based on rating and sold quantity.
 *
 * @param {Object} details - Contains rating and quantity of items sold.
 * @param {string} details.rating - The rating associated with sales performance.
 * @param {number} details.quantity - The quantity of items sold.
 * @returns {number} - Calculated sales bonus.
 */
function defaultCalculationSales({ rating, quantity }) {
    // Convert rating to a multiplier using an external utility function
    const converter = readRatingConversion();
    return converter[rating] * quantity;
}

/**
 * Calculates the social performance bonus based on given criteria.
 *
 * @param {SocialPerformance} socialPerformance - An instance of SocialPerformance class.
 * @param {Function} socialCal - Calculation function for social performance (default: defaultCalculationSocial).
 * @returns {Object} - An object containing individual social bonuses and the total bonus.
 */
function socialCalculation(socialPerformance, socialCal = defaultCalculationSocial) {
    let socialBonus = {}, total = 0;
    // console.log(socialPerformance)
    if (socialPerformance) {
        for (const value of socialPerformance) {
            // Calculate the bonus for each social criterion
            const sum = socialCal(value);
            socialBonus[value.criteria] = sum;
            total += sum;
        }
    }

    // Store the total social bonus
    socialBonus.total = total;
    return socialBonus;
}

/**
 * Calculates the sales performance bonus for each product and each client.
 *
 * @param {SalesPerformance} salesPerformance - An instance of SalesPerformance class.
 * @param {Function} salesCal - Calculation function for sales performance (default: defaultCalculationSales).
 * @returns {Object} - An object containing individual client bonuses per product and the total bonus.
 */
function salesCalculation(salesPerformance, salesCal = defaultCalculationSales) {
    let salesBonus = {}, total = 0;

    if (salesPerformance) {
        for (const value of salesPerformance) {
            // Calculate the bonus for each client
            const sum = salesCal(value);
            const product = value.product;
            const clientName = value.clientName;

            // Initialize product if not already in salesBonus
            if (!salesBonus[product]) {
                salesBonus[product] = {};
            }

            // Assign the bonus to the client under the respective product
            salesBonus[product][clientName] = sum;
            total += sum;
        }
    }

    // Store the total sales bonus
    salesBonus.total = total;
    return salesBonus;
}

/**
 * Computes the bonus for a performance report based on social and sales performances.
 *
 * @param {SocialPerformance} socialPerformance - Data for social performance calculations.
 * @param {SalesPerformance} salesPerformance - Data for sales performance calculations.
 * @param {Object} calculation - Specific calculation functions for each type of performance.
 * @returns {Object} - Contains bonuses for each criterion and the total bonus.
 */
function bonusComputation(socialPerformance, salesPerformance, calculation = { socialCal: defaultCalculationSocial, salesCal: defaultCalculationSales }) {
    const { socialCal, salesCal } = calculation;

    // Calculate social and sales bonuses separately
    let socialBonus = socialCalculation(socialPerformance, socialCal);
    let salesBonus = salesCalculation(salesPerformance, salesCal);

    // Calculate the total bonus as the sum of social and sales bonuses
    let totalBonus = { sum: socialBonus.total + salesBonus.total };

    return { socialBonus, salesBonus, totalBonus };
}


module.exports = {
    bonusComputation
};

