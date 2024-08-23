const { SocialPerformance } = require('./SocialPerformance'); // Correct import statement

class PerformanceRecord {
    constructor(salesManId, socialPerformance) {
        this.salesManId = salesManId;
        if (!(socialPerformance instanceof SocialPerformance)) {
            throw new Error('Expected an instance of SocialPerformance');
        }
        this.socialPerformance = socialPerformance.getSocialPerformance(); // Correct method name
        this.date = new Date().getFullYear(); // when was this created
    }
}

exports.PerformanceRecord = PerformanceRecord;
