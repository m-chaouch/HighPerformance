import { Component } from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent {
    performanceReport: PerformanceReportDatapoint;
    constructor(private performanceReportService: PerformanceReportService) {
        void performanceReportService.getPerformanceReport('90124', '2020').then(report => this.performanceReport = report[0]);
    }

}
