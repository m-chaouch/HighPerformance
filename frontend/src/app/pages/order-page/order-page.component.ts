import {Component, OnInit} from '@angular/core';
import { OrderDatapoint } from '../../interfaces/order-datapoint';
import {OrderService} from '../../services/order.service';
import { MatTableModule } from '@angular/material/table';
import { TransformPriorityPipe } from '../../services/transform-priority.pipe';


@Component({
    imports: [
        MatTableModule,
        TransformPriorityPipe
    ],
    selector: 'app-order-page',
    standalone: true,
    styleUrls: ['./order-page.component.css'],
    templateUrl: './order-page.component.html'
})
export class OrderPageComponent implements OnInit{
    orders: OrderDatapoint[] = [];
    displayedColumns: string[] = ['contractName', 'client', 'totalAmountIncludingTax', 'seller', 'priority'];

    constructor(private orderService: OrderService){}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe((orders): void => {
            this.orders = orders;
        });
    }
}

