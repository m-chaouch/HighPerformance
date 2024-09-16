import {SocialPerformance} from './social-performacne-datapoint';
import {SalesPerformance} from './sales-performance-datapoint';

export interface PerformanceReportDatapoint {
    salesmanID: string;
    clientName: string;
    rating: number;
    soldQuantity: number;
    salesPerformance: SalesPerformance;
    socialPerformance: SocialPerformance;
    date: string;
    calculatedBonus: object;
}
