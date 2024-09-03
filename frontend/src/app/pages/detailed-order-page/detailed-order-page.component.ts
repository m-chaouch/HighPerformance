import {Component, OnInit} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderDatapoint } from '../../interfaces/order-datapoint';
import {PositionDatapoint} from '../../interfaces/position-datapoint';
import {PositionService} from '../../services/position.service';
import {AccountDataService} from '../../services/account-data.service';
import {AccountDatapoint} from '../../interfaces/account-datapoint';

@Component({
    selector: 'app-detailed-order-page',
    templateUrl: './detailed-order-page.component.html',
    styleUrls: ['./detailed-order-page.component.css']
})
export class DetailedOrderPageComponent implements OnInit{
    SalesOrderID: string;
    order: OrderDatapoint;
    position: PositionDatapoint[];
    clientAccount: AccountDatapoint;
    sellerAccount: AccountDatapoint;
    overallAmount: number;
    private sub: any;

    constructor(private orderService: OrderService, private positionService: PositionService,
                private accountService: AccountDataService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params): void => {
            this.SalesOrderID = params.id;
            this.orderService.getOrders(this.SalesOrderID).subscribe((order): void => {
                this.order = order[0];  // [0] because we get an array of one object
                this.accountService.getAccounts(this.order.clientID).subscribe((account): void => {
                    // cascading this get bc we have to use order.clientID, which may be not arrived yet
                    this.clientAccount = account[0];  // there will be only one object in the array
                });
            });
        });
        this.positionService.getPositions(this.SalesOrderID).subscribe((position): void => {
            this.position = position;
            this.overallAmount = this.addAmounts(this.position);
        });
    }

    addAmounts(positions: PositionDatapoint[]): number {
        let overallAmount = 0;
        if (positions){      // at least one element exists
            for (const position of positions) {
                overallAmount = overallAmount + Number(position.amount);
            }
        }
        return overallAmount;
    }
}
