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
    dataSource = [];
    @Input() performanceReport: PerformanceReportDatapoint;
    @Input() salesPerformanceArray: [];
    salesPerformanceValues: any[];
    products: string[];
    spans: number[] = [];
    // existingValue = [];


    ngOnChanges(): void {
        console.log('SalesPerformanceArray:', this.salesPerformanceArray);
        const salesPerformance = this.performanceReport?.salesPerformance;
        console.log('Salesperformance in ordersevaluation:', this.performanceReport);
        console.log(salesPerformance);
        this.products = Object.keys(salesPerformance);
        this.setRowSpan(salesPerformance);
        console.log(this.spans);
    }


    private flattenSalesPerformance(salesPerformance: SalesPerformance, salesBonus: any): any[] {
        const tableData = [];
        for (let product in salesPerformance) {
            if (salesPerformance.hasOwnProperty(product)) {
                salesPerformance[product].forEach((SalesInfo): void => {

                    const clientName = SalesInfo.clientName;
                    let bonus = '';
                    if (salesBonus) {
                        bonus = salesBonus[product] ? salesBonus[product][clientName] : '';
                    }
                    console.log(tableData);
                    tableData.push({
                        productName: product,
                        clientName,
                        rating: SalesInfo.rating,
                        quantity: SalesInfo.quantity,
                        bonus : bonus
                    });
                });
            }
        }
        return tableData;
    }

    setRowSpan(salesPerformance: SalesPerformance): void {
        let i = 0;
        this.products.forEach((product): void => {
            let spanLength = salesPerformance[product].length;
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
