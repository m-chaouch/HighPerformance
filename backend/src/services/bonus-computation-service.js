const { SocialPerformance } = require('../models/SocialPeformance'); // Adjust the path as necessary

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
};

exports.bonusComputation = bonusComputation;

// Test the implementation
const socialPerformance = new SocialPerformance({
    leadershipCompetence: { actual: 5, target: 4 }, // Exceeds target
    opennessToEmployee: { actual: 3, target: 4 },  // Below target
    socialBehaviourToEmployee: { actual: 4, target: 4 }, // Meets target
    attitudeTowardsClients: { actual: 6, target: 4 }, // Exceeds target
    communicationSkills: { actual: 4, target: 4 }, // Meets target
    integrityToCompany: { actual: 7, target: 4 } // Exceeds target
});

const calculatedBonuses = bonusComputation(socialPerformance);
console.log('Calculated Bonuses:', calculatedBonuses);
