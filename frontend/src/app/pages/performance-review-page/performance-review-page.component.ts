import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';
import {UserService} from '../../services/user.service';
import {SocialPerformance} from '../../interfaces/social-performacne-datapoint';
import {RemarkEnterFieldComponent} from '../../components/remark-enter-field/remark-enter-field.component';
import {User} from '../../models/User';
import {Router} from '@angular/router';


@Component({
    selector: 'app-performance-review-page',
    templateUrl: './performance-review-page.component.html',
    styleUrls: ['./performance-review-page.component.css']
})
export class PerformanceReviewPageComponent implements OnInit {

    user: User;
    salesman: EmployeeDatapoint;
    employeeID: number;
    performanceReport: PerformanceReportDatapoint;
    performanceDate: string;
    products: any[];
    socialPerformanceArray: any[] = [];
    salesPerformanceArray: any[] = [];

    iAmCEO: boolean;
    disableButtonForCEO: boolean;
    iAmHR: boolean;
    disableButtonForHR: boolean;
    iAmSalesman: boolean;
    salesmanStatus: number;
    disableButtonForSalesmanRefuse: boolean;
    disableButtonForSalesmanAccept: boolean;

    @ViewChild(RemarkEnterFieldComponent) remarkEnterField!: RemarkEnterFieldComponent;

    constructor(private employeeDataService: EmployeeDataService,
                private performanceReportService: PerformanceReportService, private route: ActivatedRoute,
                private userService: UserService, private router: Router) {}
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

                    this.parsePerformanceReport(this.performanceReport);
                    this.disableButtonForCEO = this.performanceReport.isAcceptedByCEO;
                    this.disableButtonForHR = this.performanceReport.isAcceptedByHR;
                    this.salesmanStatus = this.performanceReport.isAcceptedBySalesman;
                    this.disableButtonForSalesmanAccept = this.salesmanStatus === 1;
                    this.disableButtonForSalesmanRefuse = this.salesmanStatus === -1;
                    this.user = await this.userService.getOwnUser().toPromise();
                    this.iAmCEO = this.user.jobTitle === 'CEO';
                    this.iAmHR = this.user.jobTitle === 'HR';
                    this.iAmSalesman = this.user.jobTitle === 'Salesman';
                })();
            });
        });
    }


    async handleButtonClick(): Promise<void> {
        try {
            if (this.user.isAdmin || this.user.jobTitle === 'CEO') {
                await this.processBonusUpdate(); // Separater asynchroner Aufruf
            } else {
                alert('Only CEO can Calculate the Bonus'); // alert for HR
            }
        } catch (error) {
            console.error('Error fetching performance report:', error);
        }
    }


    private async processBonusUpdate(): Promise<void> {
        await this.performanceReportService.updatePerformanceReportBonus(
            this.performanceReport,
            {updateBonusOnly: 'true'}
        );
        this.performanceReport = (await this.performanceReportService.getPerformanceReport(
            this.salesman.employeeCode,
            this.performanceDate))[0];
        this.parsePerformanceReport(this.performanceReport);
    }


    getButtonTextCEO(): string {
        return this.disableButtonForCEO === true ? 'Is Accepted By CEO' : 'Accept As CEO';
    }
    getButtonTextHR(): string {
        return this.disableButtonForHR === true ? 'Is Accepted By HR' : 'Accept As HR';
    }
    getButtonTextSalesmanAccept(): string {
        return this.disableButtonForSalesmanAccept === true ? 'Salesman Accept' : 'Accept as Salesman';
    }
    getButtonTextSalesmanRefused(): string {
        return this.disableButtonForSalesmanRefuse === true ? 'Salesman Refused' : 'Refuse as Salesman';
    }

    /**
     * button click ist nur möglich, falls der button nicht "disabled" ist,
     * somit keine interne status überprüfung notwendig
     */
    async handleButtonCEO(): Promise<void> {
        if (this.user.jobTitle !== 'CEO') {
            alert('Access denied!');
            return;
        }

        if (!this.performanceReport?.calculatedBonus) {
            alert('Please fetch the bonus first before confirming.');
            return;
        }

        if (!this.performanceReport?.remark) {
            alert('Remark cannot be empty when confirming the report.');
            return;
        }

        try {
            this.disableButtonForCEO = true;
            alert('Successfully accepted!');
            await this.performanceReportService.updatePerformanceReport(
                this.salesman.employeeCode, this.performanceDate, {isAcceptedByCEO: true}
            );
            await this.updateCurrentPerformanceReport();
        } catch (error) {
            console.error('Error updating performance report:', error);
            alert('An error occurred while updating the performance report. Please try again.');
        }
    }


    async handleButtonHR(): Promise<void> {
        if (this.user.jobTitle !== 'HR') {
            alert('Access denied!');
            return;
        }

        if (!this.performanceReport?.calculatedBonus) {
            alert('CEO has to fetch Bonus first');
            return;
        }

        try {
            this.disableButtonForHR = true;
            alert('successfully accepted!');
            await this.performanceReportService.updatePerformanceReport(
                this.salesman.employeeCode, this.performanceDate, {isAcceptedByHR: true}
            );
            await this.updateCurrentPerformanceReport();
        } catch (error) {
            console.error('Error updating performance report:', error);
            alert('An error occurred while updating the performance report. Please try again.');
        }
    }

    /**
     * Weitere Identitätsprüfung hier nicht notwendig, da
     * in performance-report schon geprüft wird, wer auf diese view darf und wann.
     */
    async handleButtonSalesmanAccept(): Promise<void> {
        if (!this.checkIdentityForSalesman()){
            alert('Access denied!');
            return;
        }
        alert('successfully accepted!');
        this.disableButtonForSalesmanAccept = true;
        await this.performanceReportService.updatePerformanceReport(
            this.salesman.employeeCode, this.performanceDate, {isAcceptedBySalesman: 1}
        );
        await this.updateCurrentPerformanceReport();
    }


    async handleButtonSalesmanRefused(): Promise<void> {
        if (!this.checkIdentityForSalesman()){
            alert('Access denied!');
            return;
        }

        // nicht Blockierend
        setTimeout((): void => {
            void this.router.navigate(['/performance-report']);
        }, 3000);
        alert('Successfully refused the performance report');

        this.disableButtonForSalesmanRefuse = true;
        await this.performanceReportService.updatePerformanceReport(
            this.salesman.employeeCode, this.performanceDate, {
                calculatedBonus: null, isAcceptedByCEO: false,
                isAcceptedByHR: false, isAcceptedBySalesman: 0, remark: ''
            }
        );
        await this.updateCurrentPerformanceReport();
    }

    private async updateCurrentPerformanceReport(): Promise<void> {
        this.performanceReport = (await this.performanceReportService.getPerformanceReport(
            this.salesman.employeeCode, this.performanceDate))[0];
    }

    private checkIdentityForSalesman(): boolean {
        return this.user.jobTitle === 'Salesman';
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
    routeToSates(): void{
        const salesManId: string = this.performanceReport.salesManId;
        const date: string = this.performanceReport.date;
        void this.router.navigate([`/stats/${salesManId}/${date}`]);
    }
}
