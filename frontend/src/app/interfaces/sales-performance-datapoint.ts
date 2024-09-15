/**
 * This interface defines the structure of an individual company's sales performance.
 */
export interface CompanySales {
    rating: string;
    soldQuantity: number;
}

/**
 * This interface represents the sales performance list.
 * The keys are company names, and the values are CompanySales objects.
 */
export interface SalesPerformance {
    [company: string]: CompanySales;
}
