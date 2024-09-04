import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDatapoint} from '../interfaces/account-datapoint';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountDataService {

    constructor(private http: HttpClient){}

    public getAccounts(UID= ''): Observable<AccountDatapoint[]> {
        return this.http.get<AccountDatapoint[]>(environment.apiEndpoint + `/api/accounts/${UID}`);
    }
}
