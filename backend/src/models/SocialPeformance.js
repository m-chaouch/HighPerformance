class SocialPerformance {
    constructor(defaults = {
        leadershipCompetence: { actual: 0, target: 4 },
        opennessToEmployee: { actual: 0, target: 4 },
        socialBehaviourToEmployee: { actual: 0, target: 4 },
        attitudeTowardsClients: { actual: 0, target: 4 },
        communicationSkills: { actual: 0, target: 4 },
        integrityToCompany: { actual: 0, target: 4 }
    }) {
        // Initialize properties with default values
        this.leadershipCompetence = defaults.leadershipCompetence;
        this.opennessToEmployee = defaults.opennessToEmployee;
        this.socialBehaviourToEmployee = defaults.socialBehaviourToEmployee;
        this.attitudeTowardsClients = defaults.attitudeTowardsClients;
        this.communicationSkills = defaults.communicationSkills;
        this.integrityToCompany = defaults.integrityToCompany;
    }

    // update a specific criterion
    updateCriterion(criterion, actualValue) {
        if (this[criterion]) {
            this[criterion].actual = actualValue;
        } else {
            throw new Error(`Criterion ${criterion} does not exist.`);
        }


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
exports.SocialPerformance = SocialPerformance

/**
 * 
 * // Example usage:

const performance = new SocialPerformance();
performance.updateCriterion('leadershipCompetence', 5);
console.log(performance.getPerformanceReport());
console.log('Bonus for leadershipCompetence:', performance.calculateBonus('leadershipCompetence'));
 * 
 */

