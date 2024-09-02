import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDatapoint } from '../interfaces/order-datapoint';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient){}

    public getOrders(SOID= ''): Observable<OrderDatapoint[]| OrderDatapoint> {
        return this.http.get<OrderDatapoint[]|OrderDatapoint>(environment.apiEndpoint + `/api/orders/${SOID}`);
    }
}
