const { getPerformanceReport, storePerformanceRecord, updateSocialCriteria, deletePerformanceReport, updatePerformanceReport} = require("../services/performance-report-service");
const { SocialPerformance } = require('../models/SocialPerformance');
const { PerformanceRecord } = require('../models/PerformanceRecord');
const {bonusComputation} = require("../services/bonus-computation-service");
const {SalesPerformance} = require("../models/SalesPerformance");



convert = (input) => {
    if(input.date){
        return {
            "salesManId": input.salesManId,
            "date": input.date
        }
    } else {
        return {
            "salesManId": input.salesManId,
        }
    }

}

exports.savePerformanceRecord = async function (req, res) {
    const db = req.app.get('db');
    const performance = req.body;
    try {
        if (!performance instanceof PerformanceRecord || performance === null)
            throw new TypeError("Invalid performance object");
        // Await the result of the storePerformanceRecord function
        const result = await storePerformanceRecord(db, performance);
        // Send the result if successful
        res.status(200).json(result);
    } catch (error) {
        // Handle unexpected errors
        console.error('Error saving performance record:', error);
        if (error instanceof TypeError)
            res.status(422).json({ error: 'Failed to save performance record: ' + error.message });
        else
            res.status(500).json({ error: 'Something went wrong' });
    }
    
};


exports.getPerformanceReport = async (req, res) => {
    const db = req.app.get('db');
    const {salesManId , date} = req.params
    try {
        const result = await getPerformanceReport(db, salesManId, date);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching performance report:', error);
        // Return a specific status code based on the type of error if needed
        if (error.message === 'Performance report not found.') {
            res.status(404).json({ error: 'Performance report not found' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

/**
 * calculates the bonus for a performace report
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updatePerformanceReportBonus = async (req, res) => {
    const performanceReport = req.body;
    const db = req.app.get('db');
    const { salesManId, date } = convert(performanceReport);


    try {
            const socialPerformance = new SocialPerformance(performanceReport.socialPerformance);
            const salesPerformance = new SalesPerformance(performanceReport.salesPerformance);
            const calculatedBonus = bonusComputation(socialPerformance, salesPerformance);
            const fieldToUpdate = {'calculatedBonus': calculatedBonus};
            const result = await updatePerformanceReport(db, salesManId, date, fieldToUpdate);
            if (!result) {
                res.status(404).json({error: 'Performance report not found or not updated'});
            }
            res.status(200).json({message: 'Performance report updated successfully', result});
        } catch (error) {
            console.error('Error updating performance report:', error);
            res.status(500).json({error: 'An unexpected error occurred'});
        }
};

/**
 * can be used to update field of a performance report in general
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updatePerformanceReport= async (req, res) => {
    const db = req.app.get('db');
    const { salesManId, date } = convert(req.params);
    const fieldToUpdate = req.body;
    try {
        const result = await updatePerformanceReport(db, salesManId, date, fieldToUpdate);
        if (!result) {
            res.status(404).json({error: 'Performance report not found or not updated'});
        }
        res.status(200).json({success: 'functions'});
    }catch(error){
        console.log("updating a performance report went wrong", error);
    }
}



exports.deletePerformanceReport = async (req, res) => {
    const db = req.app.get('db');
    const { salesManId, date } = convert(req.params);

    try {
        await deletePerformanceReport(db, salesManId, date);
        res.status(200).json({ message: 'Performance report deleted successfully' });
    } catch (error) {
        console.error('Error deleting performance report:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
