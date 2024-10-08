/**
 * This class is used as a template for frontend and MongoDB to save the SocialPerformance.
 */
const {defaultValueSocialPer} = require('../utils/helper')
class SocialPerformance {
    constructor(defaults = defaultValueSocialPer()) {

        this.leadershipCompetence = defaults.leadershipCompetence;
        this.opennessToEmployee = defaults.opennessToEmployee;
        this.socialBehaviourToEmployee = defaults.socialBehaviourToEmployee;
        this.attitudeTowardsClients = defaults.attitudeTowardsClients;
        this.communicationSkills = defaults.communicationSkills;
        this.integrityToCompany = defaults.integrityToCompany;

    }

    /**
     * Updates a specific criterion's actual value.
     * 
     * @param {string} criterion - The name of the criterion to update.
     * @param {number} actualValue - The actual value to set for the criterion.
     * @throws Will throw an error if the criterion does not exist.
     */
    updateCriterion(criterion, actualValue) {
        if (this[criterion]) {
            this[criterion].actual = actualValue;
        } else {
            throw new Error(`Criterion "${criterion}" does not exist.`);
        }
    }

    /**
     * Returns a copy of the current social performance.
     * 
     * @returns {criteria, actual, target} The performance report object.
     */
    getSocialPerformance() {
        return {
            leadershipCompetence: this.leadershipCompetence,
            opennessToEmployee: this.opennessToEmployee,
            socialBehaviourToEmployee: this.socialBehaviourToEmployee,
            attitudeTowardsClients: this.attitudeTowardsClients,
            communicationSkills: this.communicationSkills,
            integrityToCompany: this.integrityToCompany
        };
    }
    *[Symbol.iterator]() {
        for (const [key, {actual, target}] of Object.entries(this)) {
            yield { criteria : key, actual, target };
        }
    }
}



// Export the SocialPerformance class for use in other modules
module.exports = { SocialPerformance };

