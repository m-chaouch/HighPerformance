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

            this.employeeDataService.getEmployeeByID(this.employeeID).subscribe(async (response): Promise<void> => {
                this.salesman = response.body;
                try {
                    this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                        this.salesman.employeeCode, this.performanceDate));
                } catch (error) {
                    this.performanceReport = (await this.performanceReportService.getPerformanceRecord(this.salesman.employeeCode))
                        .find((report): boolean => report.date === this.performanceDate);
                }
                this.parsePerformanceReport(this.performanceReport);
            });

        });
    }
    async handleButtonClick(): Promise<void> {
        await this.performanceReportService.savePerformanceRecord(this.performanceReport);
        this.performanceReport = await this.performanceReportService.getPerformanceReport(this.salesman.employeeCode, this.performanceDate);
        this.parsePerformanceReport(this.performanceReport);
    }

    parsePerformanceReport(performanceReport: PerformanceReportDatapoint): void{
        this.salesPerformanceArray = Object.keys(performanceReport.salesPerformance).map(key => {
            return {
                productName: key,
                clientName: performanceReport.salesPerformance[key].clientName,
                rating: performanceReport.salesPerformance[key].rating,
                soldQuantity: performanceReport.salesPerformance[key].soldQuantity,
                bonus: Number(performanceReport.calculatedBonus?.salesBonus?.[key]) || ''
            };
        });
        this.socialPerformanceArray = Object.keys(performanceReport.socialPerformance).map(key => {
            return {
                criteria: key,
                target: Number(performanceReport.socialPerformance[key].target),
                actual: Number(performanceReport.socialPerformance[key].actual),
                bonus: Number(performanceReport.calculatedBonus?.socialBonus?.[key]) || ''
            };
        });
    }
}
