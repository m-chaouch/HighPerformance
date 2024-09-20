const { SocialPerformance } = require('./SocialPerformance'); // Correct import statement
const { SalesPerformance } = require('./SalesPerformance')

class PerformanceRecord {
    constructor(salesManId, performance = {socialPerformance: new SocialPerformance(), salesPerformance: new SalesPerformance()}, date = new Date().getFullYear()) {
        const {socialPerformance, salesPerformance} = performance;
        this.salesManId = salesManId;
        if (!(socialPerformance instanceof SocialPerformance)) {
            throw new TypeError('Expected an instance of SocialPerformance');
        }
        if (!(salesPerformance instanceof SalesPerformance)) {
            throw new TypeError('Expected an instance of SalesPerformance');
        }
        this.salesPerformance = salesPerformance;
        this.socialPerformance = socialPerformance;
        this.date = new Date().getFullYear(); // when was this created
        this.calculatedBonus = {};
        this.isAcceptedByCEO = false;
        this.isAcceptedByHR = false;
    }
}

exports.PerformanceRecord = PerformanceRecord;
