const { createDB, closeDB } = require('../support/mockdb-new');
const { SocialPerformance } = require('../../src/models/SocialPerformance');
const { PerformanceRecord } = require('../../src/models/PerformanceRecord');
const { storePerformanceRecord, getPerformanceReport } = require('../../src/services/bonus-computation-service');

async function test() {
    const salesMan = "hallo";
    const date = new Date().getFullYear(); // Example date for testing
    
    let db;
    try {
        db = await createDB(); // Create a mock database connection
        
        // Create a SocialPerformance instance
        const performance = new SocialPerformance();
        
        // Create a PerformanceRecord instance
        const record = new PerformanceRecord(salesMan, performance);
        
        // Store the performance record
        await storePerformanceRecord(db, record);
        
        // Retrieve the performance report
        const report = await getPerformanceReport(db, salesMan, date); // Include date
        
        // Log the report
        console.log('Performance Report:', report);
    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        if (db) {
          //  await closeDB(db); // Ensure the database connection is closed
        }
    }
}

test();
