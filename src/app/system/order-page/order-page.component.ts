import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../shared/services/order.service';
import {Subscription} from 'rxjs';
import {SocketService} from '../shared/services/socket.service';

@Component({
    selector: 'smartmarket-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

    orders: any;

    isLoaded = false;

    aSub1: Subscription;
    aSub2: Subscription;

    constructor(
        private orderService: OrderService,
        private socketService: SocketService
    ) {
    }

    ngOnInit() {
        this.aSub1 = this.orderService.getOrders()
            .subscribe(
                (orders) => {
                    this.orders = orders;
                    this.isLoaded = true;
                    this.socketService.onMessage
                }
            );
    }

    onRefresh() {
        this.isLoaded = false;
        this.orderService.getOrders()
            .subscribe(
                (orders) => {
                    this.orders = orders;
                    this.isLoaded = true;
                }
            );
    }

    ngOnDestroy() {
        if (this.aSub1) {
            this.aSub1.unsubscribe();
        }
        if (this.aSub2) {
            this.aSub2.unsubscribe();
        }
    }

}
