import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PerformanceReportDatapoint} from '../interfaces/performance-report-datapoint';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PerformanceReportService{


    constructor(private http: HttpClient) {}
    getPerformanceReport(SID: string): Observable<PerformanceReportDatapoint[]>{
        return this.http.get<PerformanceReportDatapoint[]>(environment.apiEndpoint + `/api/performance-report/${SID}`);
    }

}
