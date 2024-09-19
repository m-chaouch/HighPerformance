import { Component } from '@angular/core';
import {PerformanceReportService} from '../../services/performance-report.service';

@Component({
    selector: 'app-remark-enter-field',
    templateUrl: './remark-enter-field.component.html',
    styleUrls: ['./remark-enter-field.component.css']
})
export class RemarkEnterFieldComponent {
    remark: string = '';  // Property to bind to input field
    constructor(private reportService: PerformanceReportService, ) {}
}
