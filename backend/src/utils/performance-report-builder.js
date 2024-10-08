const {fetchAccounts} = require("../services/account-service");
let {SocialPerformance} = require("../models/SocialPerformance");
const {fetchOrders, extractYear, getOrdersEvaluation} = require("../services/order-service");
const {storePerformanceRecord} = require("../services/performance-report-service");

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

async function initPerformanceReports(){
    const client = new MongoClient('mongodb+srv://oemersuezen:NDomyAOEOujuh2Cd@cluster0.in2cw.mongodb.net/');
    await client.connect();
    const db = client.db("performanceDB");  // Replace with your actual database name
    await perfReportBuilder(db);

}


/**
 * creates an Performance Reports for every SalesMan
 *
 * @param db
 * @param salesmanId (the governmentId of the salesman
 * @returns {Promise<void>}
 */

function randomSocialPerformance(targetValue){  // the target value is the same on each criteria
    const criteria =
        {
            leadershipCompetence: {},
            opennessToEmployee: {},
            socialBehaviourToEmployee: {},
            attitudeTowardsClients: {},
            communicationSkills: {},
            integrityToCompany: {}
        }
    for (const key in criteria){
        let actual = Math.random() * (targetValue + 1)  // + 1 bc the actual value can be more than the target value
        criteria[key].target = targetValue;
        criteria[key].actual = Number(actual.toFixed(0));
    }
    return new SocialPerformance((criteria))
}

async function perfReportBuilder(db) {
    const orders = await fetchOrders();
    const accounts = await fetchAccounts();
    let performanceReports = perfReportBaseBuilder(orders, accounts);
    addOrderEvaluationAndSave(db, performanceReports)
}

function perfReportBaseBuilder(orders, accounts) {
    let performanceReports = [];
    let uniqueCombinations = new Set();
    orders.forEach(order => {
        accounts.forEach(account => {
            // this employee did this order! The order has to be closed to be counted!
            if (order.sellerID === account.UID && order.state === "Closed / won or next step")  {
                const salesManId = account.governmentId.toString();
                const date = extractYear(order.createdAt).toString();
                const combinationKey = `${salesManId}-${date}` // Create a unique combination of salesmanid and date

                if (!uniqueCombinations.has(combinationKey)){
                    uniqueCombinations.add(combinationKey);     // This combination is now seen
                    let performanceReport = ({
                        salesManId,
                        socialPerformance: randomSocialPerformance(5),
                        date,
                        isAcceptedByCEO: false,
                        isAcceptedByHR: false,
                        remark: ""
                    })
                    performanceReports.push(performanceReport)

                }
            }
        })
    })
    return performanceReports;
}


async function addOrderEvaluationAndSave(db, performanceReports) {
    for (const performanceReport of performanceReports) {
        const {salesManId, date} = performanceReport;   // date is a year!
        performanceReport.salesPerformance = await getOrdersEvaluation(salesManId, date)
        storePerformanceRecord(db, performanceReport);
    }
    return performanceReports;
}
initPerformanceReports();
