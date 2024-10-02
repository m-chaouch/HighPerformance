import {Component, OnInit} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';
import {EmployeeDataService} from '../../services/employee-data.service';
import {Router} from '@angular/router';
import {PerformanceReportService} from '../../services/performance-report.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';


@Component({
    selector: 'app-performance-report-page',
    templateUrl: './performance-report-page.component.html',
    styleUrls: ['./performance-report-page.component.css']
})
export class PerformanceReportPageComponent implements OnInit{
    salesmen: EmployeeDatapoint[] = [];
    displayedColumns = ['salesmanName', 'salesmanId', 'reportDate', 'reportDetails'];
    flattenedSalesmenReports: any[] = [];
    user: User;
    constructor(private employeeService: EmployeeDataService,  private router: Router,
                private performanceReportService: PerformanceReportService, private userService: UserService) {}

    ngOnInit(): void {
        this.employeeService.getEmployeeData().subscribe(async (response): Promise<void> => {  // subscribe expects a return
            if (response.status === 200) {
                this.salesmen = response.body || [];
                for (const salesMan of this.salesmen) {
                    try {
                        salesMan.performanceReport = await this.performanceReportService.getPerformanceReport(salesMan.employeeCode);
                    } catch (error) {
                        console.log(`couldn't find performancereport to ${salesMan.employeeCode}`);
                    }
                    console.log(salesMan.employeeCode, salesMan.performanceReport);
                }
                this.flattenData();
            }
        }, ((error): void => {
            console.error('Fehler beim Abrufen der Mitarbeiterdaten und Performance Reports:', error);
        }) );
        this.fetchUser();
    }

    // flattening the data, so if a salesman has two reports, he will appear twice in the table
    flattenData(): void {
        this.flattenedSalesmenReports = this.salesmen.reduce((acc, salesman): object[] => {
            // Füge für jeden Performance Report des Salesman eine neue Zeile hinzu
            const reports = salesman.performanceReport.map((report): object => ({
                salesman,
                report
            }));
            return acc.concat(reports); // Array "flatten"
        }, []);
    }

    async handleSalesmanClick(id: string, date: string): Promise<void> {
        for (const salesman of this.salesmen) {
            const condition = await this.identify(salesman, this.user, date);
            if (condition) {
                await this.router.navigate(['/performance-review', id, date]);
                break;
            }
        }
    }

    fetchUser(): void {
        this.userService.getOwnUser().subscribe((user): void => {
            this.user = user;
        });
    }

    async identify(clickedSalesman: EmployeeDatapoint, user: User, date: string): Promise<boolean> {
        if (user.isAdmin || user.jobTitle === 'HR' || user.jobTitle === 'CEO') {
            return true;
        }
        if (user.firstname === clickedSalesman.firstName && user.lastname === clickedSalesman.lastName) {
            return await this.statusBonus(clickedSalesman, date);
        }
        return false; // Fall-back, falls keine Bedingung erfüllt ist
    }

    async statusBonus(clickedSalesman: EmployeeDatapoint, date: string): Promise<boolean> {
        const report = await this.performanceReportService.getPerformanceReport(clickedSalesman.employeeCode, date);
        const {isAcceptedByCEO, isAcceptedByHR} = report[0];

        if (!isAcceptedByCEO || !isAcceptedByHR) {
            alert('Your Bonus is not completely accepted!');
            return false;
        }
        return true;
    }

}
