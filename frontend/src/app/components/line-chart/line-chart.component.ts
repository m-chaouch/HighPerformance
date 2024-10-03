import {Component, OnChanges, OnInit, Input, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexGrid
} from 'ng-apexcharts';
import {PerformanceReportDatapoint} from "../../interfaces/performance-report-datapoint";

// Define the ChartOptions type outside of the component
export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges{
    @ViewChild('chart') chart: ChartComponent;
    @Input() performanceReports: PerformanceReportDatapoint[];
    calculatedBonusExists = false;
    public chartOptions: Partial<ChartOptions> = {
        series: [
            {
                name: 'Desktops',
                data: [],
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'All total bonus',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: []
        }
    };


    constructor() {}


    ngOnChanges(changes: SimpleChanges): void {
        console.log("angekommen:", this.performanceReports);
        if (this.performanceReports && this.performanceReports.length > 0) {
            const data = this.performanceReports
                .map((performanceReport) => performanceReport?.calculatedBonus?.totalBonus?.sum)
                .filter((value) => value !== null && value !== undefined);

            const categories = this.performanceReports
                .filter((performanceReport) => performanceReport?.calculatedBonus?.totalBonus?.sum !== null && performanceReport?.calculatedBonus?.totalBonus?.sum !== undefined)
                .map((performanceReport) => Number(performanceReport.date));
            categories.sort((year0, year1): number => year0 - year1);
            console.log(categories);
            console.log('der data array:', data);

            // Neue Kopie von chartOptions erstellen WEIL ÄNDERUNGEN PER ARRAY ZUWEISUNG NICHT ERKANNT WERDEN
            this.chartOptions = {
                ...this.chartOptions,
                series: [
                    {
                        name: 'Desktops',
                        data
                    }
                ],
                xaxis: {
                    ...this.chartOptions.xaxis,
                    categories
                }
            };
        }
        this.calculatedBonusExists = this.performanceReports.some(report => report?.calculatedBonus);
    }

}
