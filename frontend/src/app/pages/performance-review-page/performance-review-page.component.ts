import {Component, ElementRef, OnInit} from '@angular/core';
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
    protected disableButtonForCEO: boolean;
    protected disableButtonForHR: boolean;
    protected bonusIsCalculated: boolean;


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
        this.disableButtonForCEO = this.performanceReport.isAcceptedByCEO;
        this.disableButtonForHR = this.performanceReport.isAcceptedByHR;
    }
    async handleButtonClick(): Promise<void> {
        await this.performanceReportService.savePerformanceRecord(this.performanceReport);
        this.performanceReport = (await this.performanceReportService.getPerformanceReport(this.salesman.employeeCode,
            this.performanceDate))[0];
        this.parsePerformanceReport(this.performanceReport);
    }

    // set button text via data
    getButtonTextCEO(): string {
        return this.disableButtonForCEO === true ? 'Is Accepted By CEO' : 'Accept As CEO';
    }
    getButtonTextHR(): string {
        return this.disableButtonForHR === true ? 'Is Accepted By HR' : 'Accept As HR';
    }

    /**
     * button click ist nur möglich, falls der button nicht "disabled" ist,
     * somit keine interne status überprüfung notwendig
     */
    // TODO was wäre wenn die accept buttons erst kommen nachdem calculatetBonus da ist ???
    handleButtonCEO(): boolean {
        // ist der calculatedBonus schon da?
        if (this.performanceReport.calculatedBonus){ // TODO check ob klappt
            alert("Bonus ist da");
            return false;
        }
        // TODO set isAcceptedByCEO auf true, auch in der db also innerhalb des performanceReports.
        this.disableButtonForCEO = true;
        //this.performanceReportService.savePerformanceRecord(this.performanceReport);
        // TODO feedback bei erfolgreichem akzeptieren -> alert oder string
        return true;
    }
    handleButtonHR(): boolean {
        this.disableButtonForHR= true
        // TODO set isAcceptedByHR auf true, auch in der db also innerhalb des performanceReports.
        return true;
    }



    parsePerformanceReport(performanceReport: PerformanceReportDatapoint): void{
        this.salesPerformanceArray = Object.keys(performanceReport.salesPerformance.list).map((key): object => ({
            clientName: key,
           // clientName: performanceReport.salesPerformance.list[key].clientName,  // use when clientname implemented
            rating: performanceReport.salesPerformance.list[key].rating,
            soldQuantity: performanceReport.salesPerformance.list[key].soldQuantity,
            bonus: Number(performanceReport.calculatedBonus?.salesBonus?.[key]) || ''
        }));
        this.socialPerformanceArray = Object.keys(performanceReport.socialPerformance).map((key): object => ({
            criteria: key,
            target: performanceReport.socialPerformance[key].target,
            actual: performanceReport.socialPerformance[key].actual,
            bonus: performanceReport.calculatedBonus?.socialBonus?.[key] || ''
        }));
    }
}
