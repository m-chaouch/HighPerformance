import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';
import {UserService} from '../../services/user.service';
import {SocialPerformance} from '../../interfaces/social-performacne-datapoint';
import {RemarkEnterFieldComponent} from '../../components/remark-enter-field/remark-enter-field.component';

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
    disableButtonForCEO: boolean;
    disableButtonForHR: boolean;

    @ViewChild(RemarkEnterFieldComponent) remarkEnterField!: RemarkEnterFieldComponent;

    constructor(private employeeDataService: EmployeeDataService,
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
                    this.disableButtonForCEO = this.performanceReport.isAcceptedByCEO;
                    this.disableButtonForHR = this.performanceReport.isAcceptedByHR;
                })();
            });

        });
    }
    async handleButtonClick(): Promise<void> {
        this.userService.getOwnUser().subscribe( async (user) => {
            if (user.isAdmin || user.jobTitle === 'CEO') {
                await this.performanceReportService.updatePerformanceReportBonus(
                    this.performanceReport,
                    {updateBonusOnly: 'true'}
                );
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                    this.salesman.employeeCode,
                    this.performanceDate))[0];
                this.parsePerformanceReport(this.performanceReport);
            }
            else {
                alert('Only CEO can Calculate the Bonus'); // alert for HR
            }
        });
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
        // TODO remark hinzufügen, darf nicht leer sein beim bestätigen des reports
        this.userService.getOwnUser().subscribe((user) => {
            if (user.jobTitle !== 'CEO') {
                alert('Access denied!');
                return;
            }
            if (!this.performanceReport?.calculatedBonus) {
                alert('fetch Bonus first');
                return;
            }
            this.performanceReportService.updatePerformanceReport(this.salesman.employeeCode, this.performanceDate, {isAcceptedByCEO: true}).then( async _ => {
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(this.salesman.employeeCode, this.performanceDate))[0];
            });
            this.disableButtonForCEO = true;
            alert('successfully accepted!');
        });
    }

    handleButtonHR(): void {
        this.userService.getOwnUser().subscribe((user) => {
            if (user.jobTitle !== 'HR') {
                alert('Access denied!');
                return;
            }
            if (!this.performanceReport?.calculatedBonus) {
                alert('CEO has to fetch Bonus first');
                return;
            }
            this.performanceReportService.updatePerformanceReport(this.salesman.employeeCode, this.performanceDate, {isAcceptedByHR: true}).then( async _ => {
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(this.salesman.employeeCode, this.performanceDate))[0];
            });
            this.disableButtonForHR = true;
            alert('successfully accepted!');
        });
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
