/**
 * This interface defines the structure of an individual company's sales performance.
 */
class SalesInfo {
    clientName: string;
    rating: number;
    quantity: number;
}

/**
 * This interface represents the sales performance list.
 * The keys are company names, and the values are CompanySales objects.
 */
export interface SalesPerformance {
    [ProductName: string]: SalesInfo[];
}
