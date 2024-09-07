/**
 * Class representing sales performance for various companies.
 * Tracks each company's rating and the total quantity of items sold.
 */
class SalesPerformance {

    /**
     * Initializes the SalesPerformance instance with an empty list of companies.
     */
    constructor() {
        /**
         * Object to store companies' sales performance.
         * Keys are company names, and values are objects containing company details (rating, soldQuantity).
         * @type {Object.<string, { rating: string, soldQuantity: number }>}
         */
        this.list = {};
    }

    /**
     * Adds a new company to the sales performance list with an initial rating and a default sold quantity of 0.
     * @param {Object} param - The company details.
     * @param {string} param.company - The name of the company.
     * @param {string} [param.rating=""] - The rating of the company.
     * @throws Will throw an error if the company already exists in the list.
     */
    addCompanyToList({ company = "name", rating = "" }) {
        // Check if the company already exists in the list
        if (this.list.hasOwnProperty(company)) {
            throw new Error("Company already exists in sales performance");
        }

        // Add the company with its rating and initialize soldQuantity to 0
        this.list[company] = { rating, soldQuantity: 0 };
    }

    /**
     * Adds sales data (sold quantity) to an existing company.
     * @param {string} company - The name of the company.
     * @param {number} soldQuantity - The number of items sold to be added to the company's record.
     * @throws Will throw an error if the company does not exist in the list.
     */
    addSales(company, soldQuantity) {
        // Ensure the company exists before adding sales
        if (!this.list.hasOwnProperty(company)) {
            throw new Error("Company does not exist in the list");
        }

        // Increment the soldQuantity for the company
        this.list[company].soldQuantity += soldQuantity;
    }
    getEntry(company){
        return this.list[company];
    }
}
exports.SalesPerformance = SalesPerformance;
