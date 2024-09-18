import {Component, OnInit} from '@angular/core';
import { OrderDatapoint } from '../../interfaces/order-datapoint';
import {OrderService} from '../../services/order.service';
import { MatTableModule } from '@angular/material/table';
import { TransformPriorityPipe } from '../../services/transform-priority.pipe';
import { Router } from '@angular/router';
import {DecimalPipe} from '@angular/common';


@Component({
    imports: [
        MatTableModule,
        TransformPriorityPipe,
        DecimalPipe
    ],
    selector: 'app-order-page',
    standalone: true,
    styleUrls: ['./order-page.component.css'],
    templateUrl: './order-page.component.html'
})
export class OrderPageComponent implements OnInit{
    orders: OrderDatapoint[] = [];
    displayedColumns: string[] = ['contractName', 'client', 'totalAmountIncludingTax', 'seller', 'priority'];

    constructor(private orderService: OrderService, private router: Router){}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe((orders): void => {
            this.orders = orders;  // safe because fetchOrders WITHOUT ID always returns an array, even having one element
        });
    }
    handleOrderClick(id: string): void {
        void this.router.navigate(['/orders', id]);  // relative to the previous route + /id
    }
}

