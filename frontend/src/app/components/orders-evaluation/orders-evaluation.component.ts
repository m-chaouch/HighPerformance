import { Component, Input } from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';

@Component({
    selector: 'app-orders-evaluation',
    templateUrl: './orders-evaluation.component.html',
    styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent {
    @Input() performanceReport: PerformanceReportDatapoint;
}
