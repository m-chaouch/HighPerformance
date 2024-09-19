import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {PerformanceReportDatapoint} from '../interfaces/performance-report-datapoint';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PerformanceReportService{
    constructor(private http: HttpClient) {}

    public getPerformanceReport(SID: string, date: string = ''): Promise<PerformanceReportDatapoint[]>{
        return this.http.get<PerformanceReportDatapoint[]>(environment.apiEndpoint + `/api/performance-report/${SID}/${date}`).toPromise();
    }

    public savePerformanceRecord(performanceRecord: PerformanceReportDatapoint):
    Promise<PerformanceReportDatapoint>{    // change later to PerformanceRecord
        return this.http.post<PerformanceReportDatapoint>(environment.apiEndpoint + '/api/performance-record',
            performanceRecord).toPromise();
    }

    public updatePerformanceReportBonus(SID: string, date: string, performanceReport: PerformanceReportDatapoint):
    Promise<PerformanceReportDatapoint>{
        const headers = {updateBonusOnly: 'true'};
        return this.http.put<PerformanceReportDatapoint>(
            environment.apiEndpoint + `/api/performance-report/${SID}/${date}`,
            performanceReport,
            {headers}
        ).toPromise();
    }
}
