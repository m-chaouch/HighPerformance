const { SocialPerformance } = require('../models/SocialPerformance');
const { PerformanceRecord } = require('../models/PerformanceRecord');
const {readRatingConversion,
    updateRatingToNumber,
    readSocialScores,
    updateSocialFactors} = require('../utils/helper')

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
function defaultCalculationSocial(criterion = { actual: 0, target: 0 }, config = { bonusFactor: socialScoreFactors.bonusFactor, additionalBonus: socialScoreFactors.additionalBonus }) {
    const { actual, target } = criterion;
    const { bonusFactor, additionalBonus } = config;
    let bonus;
    if(actual <= target){
        bonus = actual * bonusFactor;
    }else{
        bonus = target * bonusFactor;
        bonus += (actual - target) * additionalBonus;
    }



    return bonus;
}

function defaultCalculationSales({rating, soldQuantity}){
    const converter = readRatingConversion();
    var bonus = converter.rating * soldQuantity;
}





/**
 * Computes the bonus for a performance report based on social performance criteria.
 *
 * @param {S
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
function defaultCalculationSocial(criterion = { actual: 0, target: 0 }, config = { bonusFactor: 25, additionalBonus: 20 }) {
    const { actual, target } = criterion;
    const { bonusFactor, additionalBonus } = config;
    let bonus = actual <= target ? actual * bonusFactor : target * bonusFactor + (actual - target) * additionalBonus;
    return bonus;
}

/**
 * Placeholder function for calculating sales bonuses based on rating and sold quantity.
 * Requires completion based on specific business logic.
 *
 * @param {Object} details - Contains rating and sold quantity.
 * @param {number} details.rating - The rating associated with sales performance.
 * @param {number} details.soldQuantity - The quantity of items sold.
 * @returns {number} - Calculated sales bonus.
 */
function defaultCalculationSales({rating, soldQuantity}) {
    const converter = readRatingConversion(); // Ensure this function returns an object with a 'rating' property
    return converter.rating * soldQuantity; // Assumes converter object correctly provides a rating multiplier
}

/**
 * Computes the bonus for a performance report based on social and sales performance criteria.
 *
 * @param {SocialPerformance} socialPerformance - Instance of the SocialPerformance class.
 * @param {SalesPerformance} salesPerformance - Instance of the SalesPerformance class.
 * @param {Object} calculation - Object containing specific calculation functions for social and sales performance.
 * @returns {Object} - Object containing bonuses for each criterion and the total bonus.
 */
function bonusComputation(socialPerformance, salesPerformance, calculation = { socialCal: defaultCalculationSocial, salesCal: defaultCalculationSales }) {
    const { socialCal, salesCal } = calculation;
    var socialBonus = { SocialPerformance: {} }, socialTotal = 0;
    var salesBonus = { SalesPerformance: {} }, salesTotal = 0;

    Object.keys(socialPerformance).forEach(key => {
        let tmp = socialCal(socialPerformance[key]);
        socialBonus.SocialPerformance[key] = tmp;
        socialTotal += tmp;
    });
    socialBonus.total = socialTotal;

    Object.keys(salesPerformance).forEach(key => {
        let tmp = salesCal(salesPerformance[key]);
        salesBonus.SalesPerformance[key] = tmp;
        salesTotal += tmp;
    });
    salesBonus.total = salesTotal;

    let totalBonus = { social: socialTotal, sales: salesTotal };

    return { socialBonus, salesBonus, totalBonus };
}


module.exports = {
    bonusComputation,
    updateSocialCriteria,
    getPerformanceReport,
    storePerformanceRecord,
    updatePerformanceReport,
    deletePeformanceReport
};
