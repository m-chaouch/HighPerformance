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

    displayedColumns = ['productName', 'clientName', 'rating', 'soldQuantity', 'bonus'];
    dataSource = [];
    @Input() performanceReport: PerformanceReportDatapoint;
    @Input() salesPerformance: SalesPerformance;
    salesPerformanceValues: any[];
    products: string[];
    spans: number[] = [];
    // existingValue = [];

    ngOnInit(): void {
        // console.log('Salesperformance in ordersevaluation:', this.performanceReport);
        this.salesPerformance = this.performanceReport.salesPerformance;
        this.products = this.products = Object.keys(this.salesPerformance);
        this.flattenSalesPerformance(this.salesPerformance, this.performanceReport?.calculatedBonus?.salesBonus);
        this.products = Object.keys(this.salesPerformance);
        this.setRowSpan();


        // this.salesPerformance = {
        //     HooverClean: [
        //         {
        //             clientName: 'Germania GmbH',
        //             quantity: 10,
        //             rating: 3
        //         },
        //         {
        //             clientName: 'Dirk Müller GmbH',
        //             quantity: 25,
        //             rating: 3
        //         }
        //     ],
        //     HooverGo: [
        //         {
        //             clientName: 'Telekom AG',
        //             quantity: 20,
        //             rating: 1
        //         }
        //     ]
        // };

    }


    private flattenSalesPerformance(salesPerformance: SalesPerformance, salesBonus: any): void {
        for (let product in salesPerformance) {
            if (salesPerformance.hasOwnProperty(product)) {
                salesPerformance[product].forEach((SalesInfo): void => {

                    const clientName = SalesInfo.clientName;
                    let bonus = '';
                    if (salesBonus) {
                        bonus = salesBonus[product] ? salesBonus[product][clientName] : '';
                    }
                    this.dataSource.push({
                        productName: product,
                        clientName,
                        rating: SalesInfo.rating,
                        quantity: SalesInfo.quantity,
                        bonus : bonus
                    });
                });
            }
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
