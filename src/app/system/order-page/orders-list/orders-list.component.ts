import {Component, Input, OnInit} from '@angular/core';
import {fadeFastStateTrigger} from '../../../shared/animations/fade-fast.animation';

@Component({
  selector: 'smartmarket-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  animations: [fadeFastStateTrigger]
})
export class OrdersListComponent implements OnInit {

  @Input() orders: any;

  constructor() { }

  ngOnInit() {
    console.log(this.orders);
  }

}
