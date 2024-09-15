import {SocialPerformance} from './social-performacne-datapoint';
import {SalesPerformance} from './sales-performance-datapoint';

export interface PerformanceReportDatapoint {
    salesmanID: string;
    salesPerformance: SalesPerformance;
    socialPerformance: SocialPerformance;
    date: number;
    calculatedBonus: object;
}
