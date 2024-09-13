import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {Router} from '@angular/router';
import {PerformanceReportService} from '../../services/performance-report.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';

@Component({
    selector: 'app-performance-report-page',
    templateUrl: './performance-report-page.component.html',
    styleUrls: ['./performance-report-page.component.css']
})
export class PerformanceReportPageComponent implements OnInit{
    salesmen: EmployeeDatapoint[] = [];
    displayedColumns = ['salesmanName', 'salesmanId', 'department'];
    performanceReports: PerformanceReportDatapoint[] = [];
    constructor(private employeeService: EmployeeDataService,  private router: Router,
                private performanceReportService: PerformanceReportService) {}

    ngOnInit(): void {
        this.employeeService.getEmployeeData().subscribe((response): void => {
            if (response.status === 200) {
                this.salesmen = response.body || [];
            }
        }, error => {
            console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
        });
        this.performanceReportService.getAllPerformanceReports().subscribe((response): void => {
            if (response){
                this.performanceReports = response;
            }
        });
        // toDO beide Daten bündeln und dann anzeigen lassen
    }

    handleSalesmanClick(id: string): void {
        void this.router.navigate(['/performance-review', id]);  // relative to the previous route + /id
    }


}
