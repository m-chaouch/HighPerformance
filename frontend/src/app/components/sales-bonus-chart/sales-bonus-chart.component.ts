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
    chartSeries: ApexNonAxisChartSeries = []; // Keeps the values for the pie chart
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
        labels: [], // Keeps the labels for the pie chart
        title: {
            text: 'currently no data.'
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
            this.chartDetails.title.text = 'Product Distribution';
        }
    }

    ngOnInit(): void {
        void this.buildPie();
    }

}
