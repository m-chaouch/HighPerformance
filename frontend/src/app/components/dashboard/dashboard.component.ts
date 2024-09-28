import { Component } from '@angular/core';
import {ApexChart, ApexNonAxisChartSeries} from 'ng-apexcharts';

@Component({
  selector: 'bonus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    chartSeries: ApexNonAxisChartSeries = [1, 2 , 43 , 5 , 6 , 7]; // keeps the values for the pie chart
    /**
     * this holds the information for the type of chart
     */
    chartDetails: ApexChart = {
        type: 'pie',
        toolbar: {
            show: true
        }

    };
    constructor() {
    }
}
