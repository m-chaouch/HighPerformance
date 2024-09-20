/**
 * This interface defines the structure of an individual company's sales performance.
 */
export interface CompanySales {
    clientName: string;
    rating: number;
    soldQuantity: number;
}

class list {
    [company: string]: CompanySales;
}

/**
 * This interface represents the sales performance list.
 * The keys are company names, and the values are CompanySales objects.
 */
export interface SalesPerformance {
    list: list;
}
