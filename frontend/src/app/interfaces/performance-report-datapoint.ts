export interface PerformanceReportDatapoint {
    salesmanID: string;
    clientName: string;
    rating: number;
    soldQuantity: number;
    salesPerformance: object;
    socialPerformance: object;
    date: string;
    calculatedBonus: object;
}
