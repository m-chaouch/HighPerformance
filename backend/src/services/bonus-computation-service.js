

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
 * @param {Object} performanceReport - The performance report containing actual and target skill points.
 * @param {Function} [calculation=defaultCalculation] - The calculation function to use.
 * @returns {number} - The computed bonus.
 */

function bonusComputation (performanceReport, calculation = defaultCalculation) {
    return calculation(performanceReport);
};

exports.bonusComputation = bonusComputation;

