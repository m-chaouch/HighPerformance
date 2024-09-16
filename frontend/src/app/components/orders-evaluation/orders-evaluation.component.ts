import {Component, Input, OnInit} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';

@Component({
    selector: 'app-orders-evaluation',
    templateUrl: './orders-evaluation.component.html',
    styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent implements OnInit{
    private clients = [];
    @Input() performanceReport: PerformanceReportDatapoint;
    salesPerformance = [];
    constructor() {}

    ngOnInit(): void {
        this.salesPerformance = Object.values(this.performanceReport.salesPerformance);
        console.log(this.performanceReport);
    }

}
