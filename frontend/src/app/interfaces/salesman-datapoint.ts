import {EmployeeDatapoint} from './employee-datapoint';
import {PerformanceReportDatapoint} from './performance-report-datapoint';

export interface SalesmanDatapoint {
    employee: EmployeeDatapoint;
    performanceReport: PerformanceReportDatapoint;
}
