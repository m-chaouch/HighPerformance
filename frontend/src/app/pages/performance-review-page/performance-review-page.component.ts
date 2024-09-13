import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';

@Component({
    selector: 'app-performance-review-page',
    templateUrl: './performance-review-page.component.html',
    styleUrls: ['./performance-review-page.component.css']
})
export class PerformanceReviewPageComponent implements OnInit {

    salesman: EmployeeDatapoint;
    employeeID: number;
    performanceReport: PerformanceReportDatapoint;


    constructor(private employeeDataService: EmployeeDataService, private orderService: OrderService,
                private performanceReportService: PerformanceReportService, private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.route.params.subscribe((params): void => {
            this.employeeID = params.id;
            this.employeeDataService.getEmployeeByID(this.employeeID).subscribe(response => {
                this.salesman = response.body;
            });
            this.performanceReportService.getPerformanceReport(this.salesman.employeeCode).subscribe(response => {
                this.performanceReport = response;
            });
        });
    }


}
