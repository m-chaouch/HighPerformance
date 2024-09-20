import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';
import {SocialPerformance} from '../../interfaces/social-performacne-datapoint';

/* eslint-disable no-console */
@Component({
    selector: 'app-performance-review-page',
    templateUrl: './performance-review-page.component.html',
    styleUrls: ['./performance-review-page.component.css']
})
export class PerformanceReviewPageComponent implements OnInit {


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

            this.employeeDataService.getEmployeeByID(this.employeeID).subscribe( (response): void => {
                void (async (): Promise<void> => {
                    this.salesman = response.body;
                    this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                        this.salesman.employeeCode, this.performanceDate))[0]; // a Salesman can only have one performance report per date
                    this.parsePerformanceReport(this.performanceReport);
                })();
            });

        });
    }
    async handleButtonClick(): Promise<void> {
        await this.performanceReportService.updatePerformanceReportBonus(
            this.salesman.employeeCode,
            this.performanceDate,
            this.performanceReport
        );
        this.performanceReport = (await this.performanceReportService.getPerformanceReport(this.salesman.employeeCode,
            this.performanceDate))[0];
        this.parsePerformanceReport(this.performanceReport);
    }

    parsePerformanceReport(performanceReport: PerformanceReportDatapoint): void{
        this.salesPerformanceArray = Object.keys(performanceReport.salesPerformance.list).map((key): object => ({
            clientName: key,
            // clientName: performanceReport.salesPerformance.list[key].clientName,  // use when clientname implemented
            rating: performanceReport.salesPerformance.list[key].rating,
            soldQuantity: performanceReport.salesPerformance.list[key].soldQuantity,
            bonus: Number(performanceReport.calculatedBonus?.salesBonus?.[key]) || ''
        }));
        this.socialPerformanceArray = Object.keys(performanceReport.socialPerformance).map((key): object => {
            const performanceKey = key as keyof SocialPerformance;
            const performance = performanceReport.socialPerformance[performanceKey];

            return {
                criteria: key,
                target: performance.target,
                actual: performance.actual,
                // if bonus isn't a number, transform it to one.
                bonus: Number(performanceReport.calculatedBonus?.socialBonus?.[performanceKey]) || ''
            };
        });
    }
}
