import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {PerformanceReportService} from '../../services/performance-report.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
@Component({
    selector: 'app-remark-enter-field',
    templateUrl: './remark-enter-field.component.html',
    styleUrls: ['./remark-enter-field.component.css']
})
export class RemarkEnterFieldComponent implements OnInit, OnChanges {
    remark: string ;  // Property to bind to input field
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor(private reportService: PerformanceReportService, ) {}
    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.performanceReport) {
            this.remark = this.performanceReport.remark;
        }
    }

    async saveRemark(): Promise<void>{
        const {salesManId, date} = this.performanceReport;
        await this.reportService.updatePerformanceReport(salesManId, date, {remark: this.remark});
    }


}
//TODO: the remark is supposed to be fetched form the performance report and displayed. any change resutld in a update of that performacne report attribute
