import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {OrderService} from '../../shared/services/order.service';
import {Subscription} from 'rxjs';
import {fadeFastStateTrigger} from '../../../shared/animations/fade-fast.animation';
import * as Globals from '../../../../globals';

@Component({
  selector: 'smartmarket-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  animations: [fadeFastStateTrigger]
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  order: any;

  isLoaded = false;

  imageSource = Globals.images_product_address;

  aSub1: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.aSub1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.orderService.getOrderById(+params['id']))
      )
      .subscribe(
        (order) => {
          this.order = order;
          this.isLoaded = true;
          console.log(order);
        }
      );
  }

  goBack() {
    this.router.navigate(['/system/order']);
  }

  ngOnDestroy() {
    if (this.aSub1) {
      this.aSub1.unsubscribe();
    }
  }

}
