import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {PerformanceReportService} from '../../services/performance-report.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {UserService} from '../../services/user.service';
import {User} from "../../models/User";
@Component({
    selector: 'app-remark-enter-field',
    templateUrl: './remark-enter-field.component.html',
    styleUrls: ['./remark-enter-field.component.css']
})
export class RemarkEnterFieldComponent implements OnInit, OnChanges {
    currentRemark: string;  // Property to bind to input field
    enteredRemark: string;
    user: User;
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor(private reportService: PerformanceReportService, private userService: UserService) {}
    ngOnInit(): void {
        void this.userService.getOwnUser().toPromise()
            .then((user): void => {this.user = user; });
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.performanceReport) {
            this.currentRemark = this.performanceReport.remark;
        }
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async saveRemark(): Promise<void>{
        const remark = this.enteredRemark;
        this.enteredRemark = '';
        this.currentRemark = remark;
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-misused-promises
        this.userService.getOwnUser().subscribe(async (user) => {
            if (user.isAdmin || user.jobTitle === 'CEO') {
                const {salesManId, date} = this.performanceReport;
                this.performanceReport.remark = remark;
                await this.reportService.updatePerformanceReport(salesManId, date, {remark});
            }
        });
    }
}

