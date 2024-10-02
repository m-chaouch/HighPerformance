/**
 * This interface defines the structure of an individual product's sales performance.
 */
export interface ProductSales {
    clientName: string;
    quantity: number;
    rating: number;
}

/**
 * This interface represents the sales performance list.
 * The keys are product names, and the values are arrays of ProductSales objects.
 */
export interface SalesPerformance {
    [product: string]: ProductSales[]; // The keys are product names, and the values are arrays of sales records
}
