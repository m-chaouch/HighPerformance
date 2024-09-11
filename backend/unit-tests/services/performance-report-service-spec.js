const {
    storePerformanceRecord,
    getPerformanceReport,
    updatePerformanceReport,
    updateSocialCriteria
} = require('../../src/services/performance-report-service')
const {PerformanceRecord} = require('../../src/models/PerformanceRecord')
const {createDB, closeDB} = require('../support/mockdb-new')
const {SalesPerformance} = require("../../src/models/SalesPerformance");
const {SocialPerformance} = require("../../src/models/SocialPerformance");
const {get} = require("axios");
async function test(){
    var name = "ja"
    const db = await createDB();
    var date = new Date().getFullYear()

    const salesPerf = new SalesPerformance();
    const socialPerf = new SocialPerformance();


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



    var report = new PerformanceRecord(name, {socialPerformance: socialPerf, salesPerformance: salesPerf});
    console.log(report);
    await storePerformanceRecord(db ,report);

    var read = await getPerformanceReport(db, name, date)
    await updateSocialCriteria(db, name, date, {"leadershipCompetence" : 10})
    console.log(read);

    read = await getPerformanceReport(db,name, date)
    console.log(read)

}

test()
