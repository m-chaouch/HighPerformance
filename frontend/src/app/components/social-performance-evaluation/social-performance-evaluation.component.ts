import {Component, Input, OnInit} from '@angular/core';
import {EmployeeDataService} from '../../services/employee-data.service';
import {PerformanceReportDatapoint} from '../../interfaces/performance-report-datapoint';

@Component({
    selector: 'app-social-performance-evaluation',
    templateUrl: './social-performance-evaluation.component.html',
    styleUrls: ['./social-performance-evaluation.component.css']
})
export class SocialPerformanceEvaluationComponent implements OnInit{
    @Input() performanceReport: PerformanceReportDatapoint;
    constructor(private employeeDataService: EmployeeDataService) {}
    ngOnInit(): void{

    }
}
