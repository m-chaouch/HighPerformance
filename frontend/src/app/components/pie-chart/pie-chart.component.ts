import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {SocialBonusDatapoint} from '../../interfaces/social-bonus-datapoint';
import {SocialPerformance} from '../../interfaces/social-performacne-datapoint';
import {SalesBonusDatapoint} from '../../interfaces/sales-bonus-datapoint';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges{
    chartSeries: ApexNonAxisChartSeries = [1, 2, 43, 5, 6, 7]; // Keeps the values for the pie chart
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor() {}
    /**
     * Holds the chart configuration including labels and other options
     */
    chartDetails = {
        chart: {
            type: 'pie',
            toolbar: {
                show: true
            }
        } as ApexChart,
        labels: ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F'], // Keeps the labels for the pie chart
        title: {
            text: 'Pie Chart Example'
        } as ApexTitleSubtitle
    };


    buildPie(): void {
        const label: string[] = [];
        const money: number[] = [];

        const calculatedBonus = this.performanceReport.calculatedBonus;

        const entriesForSocialBonus = Object.entries(calculatedBonus.socialBonus);
        entriesForSocialBonus.forEach(([socialCriteria, bonus]) => {
            label.push(socialCriteria);
            money.push(Number(bonus));
        });
        const entriesForSalesBonus = Object.entries(calculatedBonus.salesBonus.salesBonus);
        entriesForSalesBonus.forEach(([productName, sales]) => {
            const productBonus = Object.entries(sales).reduce( ( acc, [, bonus]) => acc + bonus, 0);
            label.push(productName);
            money.push(productBonus);
        });
        this.chartDetails.labels = label;
        this.chartSeries = money;

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.performanceReport) {
            void this.buildPie();
        }
    }

}
