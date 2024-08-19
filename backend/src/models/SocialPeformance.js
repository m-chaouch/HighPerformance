/**
 * This class is used as a template for frontend and MongoDB to save the SocialPerformance.
 */
class SocialPerformance {
    constructor(defaults = {
        leadershipCompetence: { actual: 0, target: 4 },
        opennessToEmployee: { actual: 0, target: 4 },
        socialBehaviourToEmployee: { actual: 0, target: 4 },
        attitudeTowardsClients: { actual: 0, target: 4 },
        communicationSkills: { actual: 0, target: 4 },
        integrityToCompany: { actual: 0, target: 4 }
    }) {
        // Initialize properties with default values and frezzes the object
        this.leadershipCompetence = defaults.leadershipCompetence;
        this.opennessToEmployee = defaults.opennessToEmployee;
        this.socialBehaviourToEmployee = defaults.socialBehaviourToEmployee;
        this.attitudeTowardsClients = defaults.attitudeTowardsClients;
        this.communicationSkills = defaults.communicationSkills;
        this.integrityToCompany = defaults.integrityToCompany;
        Object.freeze(this);
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
     * Returns a report of the current performance.
     * 
     * @returns {Object} The performance report object.
     */
    getPerformanceReport() {
        return {
            leadershipCompetence: this.leadershipCompetence,
            opennessToEmployee: this.opennessToEmployee,
            socialBehaviourToEmployee: this.socialBehaviourToEmployee,
            attitudeTowardsClients: this.attitudeTowardsClients,
            communicationSkills: this.communicationSkills,
            integrityToCompany: this.integrityToCompany
        };
    }
}

// Export the SocialPerformance class for use in other modules
exports.SocialPerformance = SocialPerformance;
