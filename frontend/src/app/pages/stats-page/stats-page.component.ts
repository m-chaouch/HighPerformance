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
    constructor(private performanceReportService: PerformanceReportService, private route: ActivatedRoute ) {

    }

    ngOnInit(): void {
        console.log('hello');
        this.route.params.subscribe((params): void => {
            console.log(params.id);
            console.log(params.date);
            const salesId: string = params.id as string ;
            const date: string = params.id as string ;
            console.log(typeof params.date);
            void this.performanceReportService.getPerformanceReport(salesId, date)
                .then( (report) => {
                    this.performanceReport = report[0];
                    console.log(this.performanceReport);
                });
        });
    }

}
