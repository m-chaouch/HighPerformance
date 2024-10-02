import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle} from 'ng-apexcharts';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {ChartServiceService} from '../../services/chart-service.service';

@Component({
    selector: 'app-sales-bonus-chart',
    templateUrl: './sales-bonus-chart.component.html',
    styleUrls: ['./sales-bonus-chart.component.css']
})
export class SalesBonusChartComponent implements OnChanges, OnInit{
    chartSeries: ApexNonAxisChartSeries = [1, 2, 43, 5, 6, 7]; // Keeps the values for the pie chart
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor(private chartService: ChartServiceService) {}
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
        const salesBonus= this.chartService.adjustSalesBonusFormat(this.performanceReport.calculatedBonus.salesBonus);
        this.chartDetails.labels = salesBonus.label;
        this.chartSeries = salesBonus.chartSeries;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.performanceReport) {
            void this.buildPie();
        }
    }

    ngOnInit(): void {
        void this.buildPie();
    }

}
