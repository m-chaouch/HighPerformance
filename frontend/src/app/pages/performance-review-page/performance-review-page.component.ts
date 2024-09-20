import {Component, ElementRef, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';
import {UserService} from "../../services/user.service";

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
    protected disableButtonForCEO: boolean;
    protected disableButtonForHR: boolean;
    //protected bonusIsCalculated: boolean;


    constructor(private employeeDataService: EmployeeDataService, private orderService: OrderService,
                private performanceReportService: PerformanceReportService, private route: ActivatedRoute,
                private userService: UserService) {}
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

        // muss geprüft werden, da sonst CEO, HR akzeptieren können ohne das ein report da ist
        //this.bonusIsCalculated = !!this.performanceReport?.calculatedBonus; // !! wandelt den Wert in einen booleschen Wert um
    }
    async handleButtonClick(): Promise<void> {
        this.userService.getOwnUser().subscribe( async (user) => {
            if (user.isAdmin || user.jobTitle === 'CEO') {
                await this.performanceReportService.updatePerformanceReportBonus(
                    this.salesman.employeeCode,
                    this.performanceDate,
                    this.performanceReport
                );
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                    this.salesman.employeeCode,
                    this.performanceDate))[0];
                this.parsePerformanceReport(this.performanceReport);
            }
            else {
                alert('Only CEO can Calculate the Bonus'); // alert for HR
            }
        })
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
    handleButtonCEO(): void {

        this.userService.getOwnUser().subscribe((user) => {
            let userIsCEO = user.jobTitle === 'CEO';
            if (!userIsCEO) {
                alert('Access denied!');
                return;
            }
            if ( !(!!this.performanceReport?.calculatedBonus)) {
                alert('fetch Bonus first');
                return;
            }
            this.disableButtonForCEO = true;
            alert('successfully accepted!');
        })

    }

    // TODO update performacePeport in db => konstruktor nochmal aufrufen um aktuellen report zu haben der accepted wurde ???
    handleButtonHR(): void {
        //TODO remark hinzufügen, darf nicht leer sein beim bestätigen des reports
        this.userService.getOwnUser().subscribe((user) => {
            let userIsHR = user.jobTitle === 'HR';
            if (!userIsHR) {
                alert('Access denied!');
                return;
            }
            if (!!this.performanceReport?.calculatedBonus) {
                alert('CEO has to fetch Bonus first');
                return;
            }
            this.disableButtonForHR = true;
            alert('successfully accepted!');
        })
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
