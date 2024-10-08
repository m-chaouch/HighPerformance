const { storePerformanceRecord, getPerformanceReport, updatePerformanceReport, updateSocialCriteria } = require('../../src/services/performance-report-service');
const { PerformanceRecord } = require('../../src/models/PerformanceRecord');
const { SalesPerformance } = require("../../src/models/SalesPerformance");
const { SocialPerformance } = require("../../src/models/SocialPerformance");
const { MongoClient } = require("mongodb");

async function test() {
    const client = new MongoClient('mongodb+srv://oemersuezen:NDomyAOEOujuh2Cd@cluster0.in2cw.mongodb.net/');
    await client.connect();


    // Correct the database name here. For example, use "performanceDB" or whatever your actual DB name is.
    const db = client.db("performanceDB");  // Replace with your actual database name


    const salesPerf = new SalesPerformance();
    const socialPerf = new SocialPerformance();

    // Adding sales data
    salesPerf.addCompanyToList({ company: "Innovative Tech", rating: 1 });
    salesPerf.addSales("Innovative Tech", 200);
    salesPerf.addCompanyToList({ company: "Eco Solutions", rating: 1 });
    salesPerf.addSales("Eco Solutions", 150);
    salesPerf.addCompanyToList({ company: "Green Energy", rating: 3 });
    salesPerf.addSales("Green Energy", 180);
    salesPerf.addCompanyToList({ company: "Tech Dynamics", rating: 3 });
    salesPerf.addSales("Tech Dynamics", 100);

    // Updating social performance
    socialPerf.updateCriterion('leadershipCompetence', 3);
    socialPerf.updateCriterion('opennessToEmployee', 4);
    socialPerf.updateCriterion('socialBehaviourToEmployee', 2);
    socialPerf.updateCriterion('attitudeTowardsClients', 4);
    socialPerf.updateCriterion('communicationSkills', 5);
    socialPerf.updateCriterion('integrityToCompany', 5);

    let report = new PerformanceRecord(name, { socialPerformance: socialPerf, salesPerformance: salesPerf });

    await storePerformanceRecord(db, report);


}

test().catch(err => console.error(err));
