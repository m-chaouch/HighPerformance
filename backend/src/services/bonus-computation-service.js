// Imports only necessary utilities
const { readRatingConversion } = require('../utils/helper');
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
function defaultCalculationSales({ rating, quantity }) {
    const converter = readRatingConversion();
    return converter[rating] * quantity;
}

function socialCalculation(socialPerformance, socialCal = defaultCalculationSocial){
    let socialBonus = {}, total = 0;
    let sum = 0;
    if (socialPerformance) {
        // Ensure you are accessing the correct property structure
        for (const value of socialPerformance) {
            sum = socialCal(value);
            socialBonus[value.criteria] = sum;
            total += sum;
        }
    }
    socialBonus.total = total;
    return socialBonus;
}

function salesCalculation(salesPerformance, salesCal = defaultCalculationSales){
    let salesBonus = {}, total = 0;
    let product, clientName;
    if (salesPerformance) {

        for (const value of salesPerformance) {
            const sum = salesCal(value); // Correct data access
            product = value.product;
            clientName = value.clientName;
            //initialize procuct if not already in the slaesBonus
            if (!salesBonus[product])
                salesBonus[product] = {}

            salesBonus[product][clientName] = sum;// adds to the product the client name and also the correspondig bonus for the salesman
            total += sum;
        }
    }
    salesBonus.total = total;
    return salesBonus;
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
    console.log("hallo ", socialPerformance);
    console.log("hallo ", salesPerformance);

    console.log('salesPerformance: ' + salesPerformance);
    let socialBonus = socialCalculation(socialPerformance, calculation.socialCal);
    let salesBonus = salesCalculation(salesPerformance, calculation.salesCal)


    let totalBonus = { sum: socialBonus.total + salesBonus.total };
    return {socialBonus, salesBonus, totalBonus };
}


module.exports = {
    bonusComputation
}

// Creating an instance of SocialPerformance using default data
const defaultSocialPerformance = {
    leadershipCompetence: { actual: 5, target: 10 },
    opennessToEmployee: { actual: 8, target: 10 },
    socialBehaviourToEmployee: { actual: 9, target: 10 },
    attitudeTowardsClients: { actual: 7, target: 10 },
    communicationSkills: { actual: 6, target: 10 },
    integrityToCompany: { actual: 10, target: 10 }
};

// Construct SocialPerformance
const socialPerformance = new SocialPerformance(defaultSocialPerformance);

// Creating an instance of SalesPerformance using sales data
const salesDetails = {
    "HooverClean": [
        { clientName: "Germania GmbH", quantity: 10, rating: 3 },
        { clientName: "Dirk Müller GmbH", quantity: 25, rating: 3 }
    ],
    "HooverGo": [
        { clientName: "Telekom AG", quantity: 20, rating: 1 }
    ]
};

// Construct SalesPerformance
const salesPerformance = new SalesPerformance(salesDetails);

// Performing the bonus calculation
const bonus = bonusComputation(socialPerformance, salesPerformance);

// Printing the bonus calculation result
console.log("Bonus Calculation Result: ", bonus);

