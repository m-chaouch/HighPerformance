import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {Router} from '@angular/router';
import {PerformanceReportService} from '../../services/performance-report.service';


@Component({
    selector: 'app-performance-report-page',
    templateUrl: './performance-report-page.component.html',
    styleUrls: ['./performance-report-page.component.css']
})
export class PerformanceReportPageComponent implements OnInit{
    salesmen: EmployeeDatapoint[] = [];
    displayedColumns = ['salesmanName', 'salesmanId', 'reportDate', 'reportDetails'];
    flattenedSalesmenReports: any[] = [];
    constructor(private employeeService: EmployeeDataService,  private router: Router,
                private performanceReportService: PerformanceReportService) {}

    ngOnInit(): void {
        this.employeeService.getEmployeeData().subscribe(async (response): Promise<void> => {  // subscribe expects a return
            if (response.status === 200) {
                this.salesmen = response.body || [];
                for (const salesMan of this.salesmen) {
                    try {
                        salesMan.performanceReport = await this.performanceReportService.getPerformanceReport(salesMan.employeeCode);
                    } catch (error) {
                        console.log(`couldn't find performancereport to ${salesMan.employeeCode}`);
                    }
                    console.log(salesMan.employeeCode, salesMan.performanceReport);
                }
                this.flattenData();
            }
        }, ((error): void => {
            console.error('Fehler beim Abrufen der Mitarbeiterdaten und Performance Reports:', error);
        }) );
    }

    // flattening the data, so if a salesman has two reports, he will appear twice in the table
    flattenData(): void {
        this.flattenedSalesmenReports = this.salesmen.reduce((acc, salesman): object[] => {
            // Füge für jeden Performance Report des Salesman eine neue Zeile hinzu
            const reports = salesman.performanceReport.map((report): object => ({
                salesman,
                report
            }));
            return acc.concat(reports); // Array "flatten"
        }, []);
    }


    handleSalesmanClick(id: string, date: string): void {
        void this.router.navigate(['/performance-review', id, date]);  // relative to the previous route + /id
    }
}
