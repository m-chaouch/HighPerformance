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

    saveRemark(): void{

    }


}
//TODO: the remark is supposed to be fetched form the performance report and displayed. any change resutld in a update of that performacne report attribute
