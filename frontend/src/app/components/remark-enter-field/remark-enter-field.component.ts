import {Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {PerformanceReportService} from '../../services/performance-report.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
@Component({
    selector: 'app-remark-enter-field',
    templateUrl: './remark-enter-field.component.html',
    styleUrls: ['./remark-enter-field.component.css']
})
export class RemarkEnterFieldComponent implements OnInit {
    remark: string ;  // Property to bind to input field
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor(private reportService: PerformanceReportService, ) {}
    ngOnInit(): void {
        this.remark = this.performanceReport.remark;
    }

    async saveRemark(): Promise<void>{
        const {salesmanID, date} = this.performanceReport;
        this.performanceReport.remark = this.remark;
        await this.reportService.updatePerformanceReport(salesmanID, date, {remark: this.remark});
    }


}
//TODO: the remark is supposed to be fetched form the performance report and displayed. any change resutld in a update of that performacne report attribute
