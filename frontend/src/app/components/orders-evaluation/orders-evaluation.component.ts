import {Component, Input, OnInit} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-orders-evaluation',
    templateUrl: './orders-evaluation.component.html',
    styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent implements OnInit{
    private clients = [];

    @Input() performanceReport: BehaviorSubject<PerformanceReportDatapoint>;

    performanceReports: PerformanceReportDatapoint ;

    ngOnInit(): void {
        this.performanceReport.subscribe((report): void => {
            if (report) {
                console.log('PerformanceReport received:', report);
                this.performanceReports = report;
            }
        });
    }
}
