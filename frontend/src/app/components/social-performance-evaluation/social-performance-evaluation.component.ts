import {Component, Input, OnInit} from '@angular/core';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';

@Component({
    selector: 'app-social-performance-evaluation',
    templateUrl: './social-performance-evaluation.component.html',
    styleUrls: ['./social-performance-evaluation.component.css',
        '../../pages/performance-review-page/performance-review-page.component.css']
})
export class SocialPerformanceEvaluationComponent implements OnInit{

    displayedColumnsSocial = ['criteria', 'targetValue', 'actualValue', 'bonus'];
    @Input() performanceReport: PerformanceReportDatapoint;
    @Input() socialPerformanceArray: [];

    constructor() {}
    ngOnInit(): void{
        console.log('SocialPerformanceArray:', this.socialPerformanceArray);
    }
}
