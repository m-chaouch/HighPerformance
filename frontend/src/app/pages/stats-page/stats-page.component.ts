import {Component, OnInit} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';

@Component({
    selector: 'app-stats-page',
    templateUrl: './stats-page.component.html',
    styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit{
    performanceReport: PerformanceReportDatapoint;
    performanceReports: PerformanceReportDatapoint[];
    constructor(private performanceReportService: PerformanceReportService) {}

    ngOnInit(): void {
        console.log('hello');
        void this.performanceReportService.getPerformanceReport('90124', '2020')
            .then( (report): void => {
                this.performanceReport = report[0];
            });

        this.performanceReportService.getPerformanceReport('90124').then((performanceReports): void => {
            this.performanceReports = performanceReports;
            console.log(this.performanceReports);
        }).catch((error): void => {
            console.error('Error fetching performance reports:', error);
        });
    }

}
