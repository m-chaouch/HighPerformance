/**
 * Dieses Interface beschreibt die Struktur eines Datensatzes für einen Mitarbeiter.
 * Es definiert die Eigenschaften, die ein Mitarbeiterobjekt besitzen muss, wenn es
 * vom Backend empfangen oder innerhalb der Anwendung verwendet wird.
 */
import {PerformanceReportDatapoint} from './performance-report-datapoint';

export interface EmployeeDatapoint {
    employeeCode: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    jobTitle: string | null;
    unit: string | null; // unit can be null, so it's good to handle it
    performanceReport: PerformanceReportDatapoint[];
}
