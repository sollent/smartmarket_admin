import {Component, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces';
import {ProductService} from '../shared/services/product.service';
import {Message} from '../../shared/models/message.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss'],
    animations: [fadeStateTrigger]
})
export class ProductsPageComponent implements OnInit {

    products: Product[];

    isLoaded = false;

    message: Message;

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.productService.getProducts()
            .subscribe(
                (products: Product[]) => {
                    this.products = products;
                    this.isLoaded = true;
                }
            );
        this.route.queryParams.subscribe((params: Params) => {
           if (params['successCreate']) {
               this.showMessage('Товар успешно создан', 'success', '/system/products');
           } else if (params['successEdit']) {
               this.showMessage('Товар успешно отредактирован', 'success', '/system/products');
           }
        });
    }

    private showMessage(text: string, type: string = 'danger', redirect: string = '') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
            if (redirect !== '') {
                this.router.navigate([redirect]);
            }
        }, 5000);
    }
}
