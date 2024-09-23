import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {PerformanceReportService} from '../../services/performance-report.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {UserService} from "../../services/user.service";
@Component({
    selector: 'app-remark-enter-field',
    templateUrl: './remark-enter-field.component.html',
    styleUrls: ['./remark-enter-field.component.css']
})
export class RemarkEnterFieldComponent implements OnInit, OnChanges {
    remark: string ;  // Property to bind to input field
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor(private reportService: PerformanceReportService, private userService: UserService) {}
    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.performanceReport) {
            this.remark = this.performanceReport.remark;
        }
    }

    async saveRemark(): Promise<void>{
        this.userService.getOwnUser().subscribe(async (user) => {
            if (user.isAdmin || user.jobTitle === 'CEO') {
                const {salesManId, date} = this.performanceReport;
                this.performanceReport.remark = this.remark;
                await this.reportService.updatePerformanceReport(salesManId, date, {remark: this.remark});
            }else {
                this.remark = "";
            }
        });
    }
}
//TODO: the remark is supposed to be fetched form the performance report and displayed. any change resutld in a update of that performacne report attribute
