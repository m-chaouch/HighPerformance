const { createDB, closeDB } = require('../support/mockdb-new');
const { SocialPerformance } = require('../../src/models/SocialPerformance');
const { PerformanceRecord } = require('../../src/models/PerformanceRecord');
const { storePerformanceRecord, getPerformanceReport, updateSocialCriteria,
    updatePerformanceReport
} = require('../../src/services/bonus-computation-service');

async function test() {
    const salesMan = "hallo";
    const date = new Date().getFullYear(); // Example date for testing
    
    let db;
 
    db = await createDB(); // Create a mock database connection
    
    // Create a SocialPerformance instance
    const performance = new SocialPerformance();
    
    // Create a PerformanceRecord instance
    const record = new PerformanceRecord(salesMan, performance);
    
    // Store the performance record
    await storePerformanceRecord(db, record);
    
    // Retrieve the performance report
    const report = await getPerformanceReport(db, salesMan, date);
    // Log the report
    console.log('Performance Report:', report);
    let newID = "DD"

    await updatePerformanceReport(db, salesMan, date,{"salesManId": newID})
    await updateSocialCriteria(db, newID, date, ["leadershipCompetence"], [2]);

    const reportAfterUpdate = await getPerformanceReport(db, newID, date); 
    
    // Log the report
    console.log('Performance Report after update:', reportAfterUpdate);



    //update cirtaia 

    //  await closeDB(db); // Ensure the database connection is closed
    closeDB(db);
}


test();

