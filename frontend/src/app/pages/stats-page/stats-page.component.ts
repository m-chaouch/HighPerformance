import {Component, OnInit} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';
import {PerformanceReportService} from '../../services/performance-report.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-stats-page',
    templateUrl: './stats-page.component.html',
    styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit{
    performanceReport: PerformanceReportDatapoint;
    performanceReports: PerformanceReportDatapoint[];
    constructor(private performanceReportService: PerformanceReportService, private route: ActivatedRoute ) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(async (params): Promise<void> => {
            const id = params.id as string;
            const date = params.date as string;
            console.log(id, date);
            this.performanceReport = (await this.performanceReportService.getPerformanceReport(id, date))[0];
            this.performanceReports = await this.performanceReportService.getPerformanceReport(id);
            console.log(this.performanceReport);
        });
    }


}
