const { bonusComputation } = require("../services/bonus-computation-service");
const { SocialPerformance } = require('../models/SocialPeformance');


exports.socialPerformance = function (req, res){
    const socialPerformance = req.body;
    cost db 
    

};


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
