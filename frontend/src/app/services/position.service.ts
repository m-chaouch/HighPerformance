import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PositionDatapoint } from '../interfaces/position-datapoint';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) {}

    public getPositions(SOID: string): Observable<PositionDatapoint[]> {    //Positions are always searched by a SOID!
        return this.http.get<PositionDatapoint[]>(environment.apiEndpoint + `/api/positions/${SOID}`);
    }
}
