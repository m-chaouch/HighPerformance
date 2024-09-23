import {Component, Input} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';

@Component({
    selector: 'app-orders-evaluation',
    templateUrl: './orders-evaluation.component.html',
    styleUrls: ['./orders-evaluation.component.css',
        '../../pages/performance-review-page/performance-review-page.component.css']
})
export class OrdersEvaluationComponent{

    displayedColumnsOrders = ['clientName', 'rating', 'soldQuantity', 'bonus'];
    @Input() performanceReport: PerformanceReportDatapoint;
    @Input() salesPerformanceArray: [];

}
