const { readRatingConversion } = require('../utils/helper');
const { SocialPerformance } = require('./SocialPerformance'); // Correct import statement

/**
 * Class representing sales performance for various companies.
 * Tracks each company's rating and the total quantity of items sold.
 */
class SalesPerformance {
    /**
     * Initializes the SalesPerformance instance with an empty list of companies.
     *
     * @param {Object.<string, Array<{clientName: string, quantity: number, rating: number}>>} salesDetails
     *
     */
    constructor(salesDetails) {
        this.salesDetails = salesDetails;
    }

    /**
     * Makes the SalesPerformance object iterable.
     * @returns {Generator<{product: string, rating: string, soldQuantity: number}>}
     */
    *[Symbol.iterator]() {
        for (const [product, salesRecords] of Object.entries(this.salesDetails)) {
            for (const { clientName, quantity, rating } of salesRecords) {
                yield { product, clientName, quantity, rating };
            }
        }
    }
}

exports.SalesPerformance = SalesPerformance;