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
         * @type {Object.<string, {rating: string, soldQuantity: number}>}
         */
        this.list = {};
    }

    /**
     * Adds a new company to the sales performance list with an initial rating and a default sold quantity of 0.
     * @param {Object} companyDetails - The company details.
     * @param {string} companyDetails.company - The name of the company.
     * @param {string} [companyDetails.rating="not defined"] - The rating of the company.
     */
    addCompanyToList({company = "not defined", rating = "not defined"} = {}) {
        if (this.list.hasOwnProperty(company)) {
            throw new Error("Company already exists in sales performance");
        }
        this.list[company] = { rating, soldQuantity: 0 };
    }

    /**
     * Adds sales data (sold quantity) to an existing company in the sales performance list.
     * @param {string} company - The name of the company.
     * @param {number} soldQuantity - The number of items sold to be added to the company's record.
     */
    addSales(company = "not defined", soldQuantity = 0) {
        if (!this.list.hasOwnProperty(company)) {
            this.addCompanyToList({ company }); // Automatically add company with default details
        }
        this.list[company].soldQuantity += soldQuantity;
    }

    /**
     * Retrieves the sales entry for a specific company.
     * @param {string} company - The name of the company.
     * @returns {Object} The details of the company including rating and soldQuantity.
     */
    getEntry(company) {
        return this.list[company];
    }
}

// Example usage of the SalesPerformance class
const salesPerformance = new SalesPerformance();

// Add a new company with default details
salesPerformance.addCompanyToList({company: "Example Company", rating: "High"});

// Adding sales to a company, handling case where company might not exist
salesPerformance.addSales("Example Company", 33);

// Output the details of a specific company
console.log(salesPerformance.getEntry("Example Company"));
