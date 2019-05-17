import {Component, Input, OnInit} from '@angular/core';
import * as Globals from '../../../../globals';
import {Product} from '../../shared/interfaces';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    animations: [fadeStateTrigger]
})
export class ProductsListComponent implements OnInit {

    @Input() products: Product[];

    imageSource = Globals.images_product_address;

    constructor() {}

    ngOnInit() {
        console.log(this.products);
    }

    getProductStatusClasses(product: Product) {
        return {
            'product-status': product.productStatus.name === 'bonuses',
            'product-pre-order-status': product.productStatus.name === 'pre-order'
        };
    }
}
