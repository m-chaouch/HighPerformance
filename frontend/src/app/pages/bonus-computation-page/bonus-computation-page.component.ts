import {Component} from '@angular/core';
import {EmployeeDatapoint} from '../../interfaces/employee-datapoint';

@Component({
    selector: 'app-bonus-computation-page',
    templateUrl: './bonus-computation-page.component.html',
    styleUrls: ['./bonus-computation-page.component.css'],
})
export class BonusComputationPageComponent{
    Salesmen: EmployeeDatapoint[];
}
