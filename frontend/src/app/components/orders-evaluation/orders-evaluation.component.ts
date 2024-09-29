import {Component, Input, OnInit} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {SalesPerformance} from '../../interfaces/sales-performance-datapoint';

@Component({
    selector: 'app-orders-evaluation',
    templateUrl: './orders-evaluation.component.html',
    styleUrls: ['./orders-evaluation.component.css',
        '../../pages/performance-review-page/performance-review-page.component.css']
})
export class OrdersEvaluationComponent implements OnInit{

    displayedColumns = ['productName', 'clientName', 'rating', 'soldQuantity'];
    dataSource = [];
    @Input() performanceReport: PerformanceReportDatapoint;
    @Input() salesPerformance: SalesPerformance;
    salesPerformanceValues: any[];
    @Input() products: string[];
    spans: number[] = [];
    // existingValue = [];

    protected readonly Object = Object;

    ngOnInit(): void {
        this.salesPerformance = {
            HooverClean: [
                {
                    clientName: 'Germania GmbH',
                    quantity: 10,
                    rating: 3
                },
                {
                    clientName: 'Dirk Müller GmbH',
                    quantity: 25,
                    rating: 3
                }
            ],
            HooverGo: [
                {
                    clientName: 'Telekom AG',
                    quantity: 20,
                    rating: 1
                }
            ]
        };
        this.flattenSalesPerformance(this.salesPerformance);
        console.log(this.dataSource);
        this.products = Object.keys(this.salesPerformance);
        this.setRowSpan();
    }

    private flattenSalesPerformance(salesPerformance: SalesPerformance): void {
        for (let key in salesPerformance) {
            salesPerformance[key].forEach((SalesInfo): void => {
                this.dataSource.push({
                    productName: key,
                    clientName: SalesInfo.clientName,
                    rating: SalesInfo.rating,
                    quantity: SalesInfo.quantity});
            });
        }
    }

    setRowSpan(): void {
        let i = 0;
        this.products.forEach((product): void => {
            let spanLength = this.salesPerformance[product].length;
            this.spans[i] = spanLength;
            i = i + spanLength;
        });
    }
    // valueExists(productName: string): string {
    //     if (this.existingValue.indexOf(productName) !== -1) {
    //         return 'none'; // Ausblenden
    //     } else {
    //         this.existingValue.push(productName);
    //         return ''; // Anzeigen
    //     }
    // }
}
