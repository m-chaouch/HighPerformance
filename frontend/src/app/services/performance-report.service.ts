import {Injectable} from '@angular/core';
import {CalculatedBonusDatapoint} from '../interfaces/calculated-bonus-datapoint';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PerformanceReportDatapoint} from '../interfaces/performance-report-datapoint';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PerformanceReportService{
    calculatedBonus: CalculatedBonusDatapoint;

    constructor(private http: HttpClient) {}
    getPerformanceReport(SID: string): Observable<PerformanceReportDatapoint>{
        return this.http.get<PerformanceReportDatapoint>(environment.apiEndpoint + `/api/performance-report/${SID}`);
    }

    getAllPerformanceReports(): Observable<PerformanceReportDatapoint[]>{
        return this.http.get<PerformanceReportDatapoint[]>(environment.apiEndpoint + '/api/performance-reports');
    }
}
