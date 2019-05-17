import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'smartmarket-new-product-characteristics',
    templateUrl: './new-product-characteristics.component.html',
    styleUrls: ['./new-product-characteristics.component.scss']
})
export class NewProductCharacteristicsComponent implements OnInit {

    mainChar = false;
    mainCharValue = '';

    childInputs = [];
    childChars = [];

    productId: number;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
           this.productId = params['id'];
        });
    }

    createMainChar(mainInput: HTMLInputElement) {
        this.mainChar = true;
        this.childInputs.push({test: 'test'});
        this.mainCharValue = mainInput.value;
    }

    addChildChar(key: HTMLInputElement, value: HTMLInputElement, button: HTMLElement) {
        this.childInputs.push({test: 'test'});
        this.childChars.push({
           key: key.value,
           value: value.value
        });
        button.parentNode.removeChild(button);
    }

    saveCharacteristics() {
        const characteristics = {
            name: this.mainCharValue,
            chars: this.childChars
        };
        const result = [];
        result.push(characteristics);
        this.productService.newProductCharacteristics(result, this.productId)
            .subscribe(
                () => {
                    this.router.navigate(['/system/product/edit', this.productId], {
                       queryParams: {
                           successCreateCharacteristics: true
                       }
                    });
                }
            );
    }

    goBack() {
        this.router.navigate(['/system/product/edit', this.productId]);
    }

}
