import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {Router} from '@angular/router';
import {PerformanceReportService} from '../../services/performance-report.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {SalesmanDatapoint} from '../../interfaces/salesman-datapoint';
import {ApprovalPipe} from '../../services/approval.pipe';



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
        this.employeeService.getEmployeeData().subscribe((response): void => {
            if (response.status === 200) {
                this.salesmen = response.body || [];
                this.salesmen.forEach(salesMan => {
                    this.performanceReportService.getPerformanceReport(salesMan.employeeCode).subscribe(response => {
                        salesMan.performanceReport = response;
                        console.log(this.salesmen)
                        this.flattenData();
                    });
                });
            }
        }), error => {
            console.error('Fehler beim Abrufen der Mitarbeiterdaten und Performance Reports:', error);
        };
    }

    // flattening the data, so if a salesman has two reports, he will appear twice in the table
    flattenData(): void {
        this.flattenedSalesmenReports = this.salesmen.reduce((acc, salesman) => {
            // Füge für jeden Performance Report des Salesman eine neue Zeile hinzu
            const reports = salesman.performanceReport.map(report => ({
                salesman: salesman,
                report: report
            }));
            return acc.concat(reports); // Array "flatten"
        }, []);
    }

    // toDO beide Daten bündeln und dann anzeigen lassen

    handleSalesmanClick(id: string): void {
        void this.router.navigate(['/performance-review', id]);  // relative to the previous route + /id
    }


}
