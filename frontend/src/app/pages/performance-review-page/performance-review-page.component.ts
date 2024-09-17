import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';

/* eslint-disable no-console */
@Component({
    selector: 'app-performance-review-page',
    templateUrl: './performance-review-page.component.html',
    styleUrls: ['./performance-review-page.component.css']
})
export class PerformanceReviewPageComponent implements OnInit {

    displayedColumnsOrders = ['productName', 'clientName', 'rating', 'soldQuantity', 'bonus'];
    displayedColumnsSocial = ['criteria', 'targetValue', 'actualValue', 'bonus'];
    salesman: EmployeeDatapoint;
    employeeID: number;
    performanceReport: PerformanceReportDatapoint;
    performanceDate: string;
    salesPerformanceArray: any[] = [];
    socialPerformanceArray: any[] = [];


    constructor(private employeeDataService: EmployeeDataService, private orderService: OrderService,
                private performanceReportService: PerformanceReportService, private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.route.params.subscribe((params): void => {
            this.employeeID = Number(params.id);
            this.performanceDate = String(params.date);

            this.employeeDataService.getEmployeeByID(this.employeeID).subscribe((response): void => {
                this.salesman = response.body;
                this.parsePerformanceReport();
            });

        });
    }


    async handleButtonClick(): Promise<void> {
        await this.performanceReportService.savePerformanceRecord(this.performanceReport);
        this.parsePerformanceReport();
    }

    parsePerformanceReport(): void{
        this.performanceReportService.getPerformanceReport(this.salesman.employeeCode).subscribe((response): void => {
            console.log(this.salesman.employeeCode);
            this.performanceReport = response.find((report): boolean => report.date === this.performanceDate);
            this.salesPerformanceArray = Object.keys(this.performanceReport.salesPerformance).map(key => {
                return {
                    productName: key,
                    clientName: this.performanceReport.salesPerformance[key].clientName,
                    rating: this.performanceReport.salesPerformance[key].rating,
                    soldQuantity: this.performanceReport.salesPerformance[key].soldQuantity,
                    bonus: this.performanceReport.calculatedBonus?.salesBonus?.[key]?.$numberDouble || ''
                };
            });
            this.socialPerformanceArray = Object.keys(this.performanceReport.socialPerformance).map(key => {
                return {
                    criteria: key,
                    target: Number(this.performanceReport.socialPerformance[key].target),
                    actual: Number(this.performanceReport.socialPerformance[key].actual),
                    bonus: this.performanceReport.calculatedBonus?.socialBonus?.[key] || ''
                };
            });
        });
    }
}
