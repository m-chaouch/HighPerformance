import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';
import {UserService} from '../../services/user.service';
import {SocialPerformance} from '../../interfaces/social-performacne-datapoint';
import {RemarkEnterFieldComponent} from '../../components/remark-enter-field/remark-enter-field.component';


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
    products: any[];
    socialPerformanceArray: any[] = [];
    disableButtonForCEO: boolean;
    disableButtonForHR: boolean;
    salesPerformanceArray: any[] = [];

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
                        this.salesman.employeeCode,
                        this.performanceDate
                    ))[0]; // a Salesman can only have one performance report per date
                    if (!this.performanceReport.salesPerformance) { // if and only if salesPerformance is undefined, then initialize it
                        const salesPerformance = await this.performanceReportService.getOrdersEvaluation(
                            this.salesman.employeeCode,
                            this.performanceDate
                        );
                        this.performanceReport.salesPerformance = salesPerformance;
                        await this.performanceReportService.updatePerformanceReport(
                            this.salesman.employeeCode,
                            this.performanceDate,
                            {salesPerformance}
                        );
                    }
                    console.log('SALESPERFORMANCE!!!!', this.performanceReport.salesPerformance);

                    this.parsePerformanceReport(this.performanceReport);
                    this.disableButtonForCEO = this.performanceReport.isAcceptedByCEO;
                    this.disableButtonForHR = this.performanceReport.isAcceptedByHR;
                })();
            });

        });
    }
    handleButtonClick(): void {
        this.userService.getOwnUser().subscribe( async (user): Promise<void> => {
            if (user.isAdmin || user.jobTitle === 'CEO') {
                await this.performanceReportService.updatePerformanceReportBonus(
                    this.performanceReport,
                    {updateBonusOnly: 'true'}
                );
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                    this.salesman.employeeCode,
                    this.performanceDate))[0];
                console.log('SALESPERFORMANCE:' , this.performanceReport);
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
        this.userService.getOwnUser().subscribe((user) => {
            if (user.jobTitle !== 'CEO') {
                alert('Access denied!');
                return;
            }
            if (!this.performanceReport?.calculatedBonus) {
                alert('fetch Bonus first');
                return;
            }
            this.performanceReportService.updatePerformanceReport(
                this.salesman.employeeCode,
                this.performanceDate,
                {isAcceptedByCEO: true}).then( async _ => {
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                    this.salesman.employeeCode,
                    this.performanceDate))[0];
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
            this.performanceReportService.updatePerformanceReport(
                this.salesman.employeeCode,
                this.performanceDate,
                {isAcceptedByHR: true}).then( async _ => {
                this.performanceReport = (await this.performanceReportService.getPerformanceReport(
                    this.salesman.employeeCode,
                    this.performanceDate))[0];
            });
            this.disableButtonForHR = true;
            alert('successfully accepted!');
        });
    }

    parsePerformanceReport(performanceReport: PerformanceReportDatapoint): void{
        this.salesPerformanceArray = this.parseSalesPerformance(performanceReport);
        this.socialPerformanceArray = this.parseSocialPerformance(performanceReport);
    }

    private parseSalesPerformance(performanceReport: PerformanceReportDatapoint): any[]{
        const salesPerformance = performanceReport?.salesPerformance;
        const salesBonus = performanceReport?.calculatedBonus?.salesBonus;
        const tableData = [];
        for (const product in salesPerformance) {
            if (salesPerformance.hasOwnProperty(product)) {
                salesPerformance[product].forEach((SalesInfo): void => {
                    const clientName = SalesInfo.clientName;
                    let bonus = '';
                    if (salesBonus) {
                        bonus = salesBonus[product] ? salesBonus[product][clientName] : '';
                    }
                    console.log('SALESPERFORMANCEARRAY:', tableData);
                    tableData.push({
                        productName: product,
                        clientName,
                        rating: SalesInfo.rating,
                        quantity: SalesInfo.quantity,
                        bonus
                    });
                });
            }
        }
        return tableData;
    }

    private parseSocialPerformance(performanceReport: PerformanceReportDatapoint): any[] {
        return Object.keys(performanceReport.socialPerformance).map((key): object => {
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
