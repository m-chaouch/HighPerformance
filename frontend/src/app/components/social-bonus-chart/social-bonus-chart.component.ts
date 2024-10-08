import {Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {SocialBonusDatapoint} from '../../interfaces/social-bonus-datapoint';
import {SocialPerformance} from '../../interfaces/social-performacne-datapoint';
import {SalesBonusDatapoint} from '../../interfaces/sales-bonus-datapoint';
import {ChartServiceService} from '../../services/chart-service.service';


@Component({
  selector: 'app-social-bonus-chart',
  templateUrl: './social-bonus-chart.component.html',
  styleUrls: ['./social-bonus-chart.component.css']
})
export class SocialBonusChartComponent implements OnChanges, OnInit{
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
        const socialBonus= this.chartService.adjustSocialBonusFormat(this.performanceReport.calculatedBonus.socialBonus);
        this.chartDetails.labels = socialBonus.label;
        this.chartSeries = socialBonus.chartSeries;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.performanceReport) {
            void this.buildPie();
            this.chartDetails.title.text = 'Criteria Distribution';
        }
    }

    ngOnInit(): void {
        void this.buildPie();
    }

}
