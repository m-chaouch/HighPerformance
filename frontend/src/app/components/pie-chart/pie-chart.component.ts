import { Component } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
    selector: 'pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
    chartSeries: ApexNonAxisChartSeries = [1, 2, 43, 5, 6, 7]; // Keeps the values for the pie chart

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

    constructor() {}
}
