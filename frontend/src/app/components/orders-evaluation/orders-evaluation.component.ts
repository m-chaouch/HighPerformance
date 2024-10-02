import {Component, Input, OnChanges} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {SalesPerformance} from '../../interfaces/sales-performance-datapoint';

@Component({
    selector: 'app-orders-evaluation',
    templateUrl: './orders-evaluation.component.html',
    styleUrls: ['./orders-evaluation.component.css',
        '../../pages/performance-review-page/performance-review-page.component.css']
})
export class OrdersEvaluationComponent implements OnChanges{

    displayedColumns = ['productName', 'clientName', 'rating', 'soldQuantity', 'bonus'];
    @Input() performanceReport: PerformanceReportDatapoint;
    @Input() salesPerformanceArray: [];
    products: string[];
    spans: number[] = [];


    ngOnChanges(): void {
        const salesPerformance = this.performanceReport?.salesPerformance;
        if (salesPerformance){
            this.products = Object.keys(salesPerformance);
            this.setRowSpan(salesPerformance);
        }
    }

    setRowSpan(salesPerformance: SalesPerformance): void {
        let i = 0;
        this.products.forEach((product): void => {
            const spanLength = salesPerformance[product].length;
            this.spans[i] = spanLength;
            i = i + spanLength;
        });
    }
}
