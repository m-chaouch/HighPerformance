const { createDB, closeDB } = require('../support/mockdb-new');
const { SocialPerformance } = require('../../src/models/SocialPerformance');

const { SalesPerformance } = require('../../src/models/SalesPerformance');
const { PerformanceRecord } = require('../../src/models/PerformanceRecord');
//const { bonusComputation} = require('../../src/services/bonus-computation-service');
const {saveSocialPerformance} = require("../../src/apis/bonus-computaion-api");
const {bonusComputation} = require("../../src/services/bonus-computation-service");

async function test() {
    const db = await createDB();

    // Initialize performance classes
    const salesPerf = new SalesPerformance();
    const socialPerf = new SocialPerformance();
    console.log("fff", socialPerf);

    // Adding sales data
    salesPerf.addCompanyToList({ company: "Innovative Tech", rating: "none" });
    salesPerf.addSales("Innovative Tech", 200);
    salesPerf.addCompanyToList({ company: "Eco Solutions", rating: "good" });
    salesPerf.addSales("Eco Solutions", 150);
    salesPerf.addCompanyToList({ company: "Green Energy", rating: "good" });
    salesPerf.addSales("Green Energy", 180);
    salesPerf.addCompanyToList({ company: "Tech Dynamics", rating: "excellent" });
    salesPerf.addSales("Tech Dynamics", 100);

    // Updating social performance
    socialPerf.updateCriterion('leadershipCompetence', 3);
    socialPerf.updateCriterion('opennessToEmployee', 4);
    socialPerf.updateCriterion('socialBehaviourToEmployee', 2);
    socialPerf.updateCriterion('attitudeTowardsClients', 4);
    socialPerf.updateCriterion('communicationSkills', 5);
    socialPerf.updateCriterion('integrityToCompany', 5);

    ;
    // Create a PerformanceRecord
    const perfRecord = new PerformanceRecord("dfdsfs", {
        socialPerformance: socialPerf,
        salesPerformance: salesPerf
    });

    // Compute bonuses
    perfRecord.calculatedBonus = bonusComputation(
         perfRecord.socialPerformance,
        perfRecord.salesPerformance
    );

    console.log(perfRecord.calculatedBonus);

    // Close the mock database connection
    await closeDB(db);
}

// test();
//
//
// test();
