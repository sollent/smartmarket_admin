import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {Category, Product, ProductStatus, SubCategory} from '../../shared/interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {combineLatest} from 'rxjs';
import {ProductService} from '../../shared/services/product.service';

@Component({
    selector: 'smartmarket-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef;

    addSubCategory = false;
    addSeoInformation = false;
    addBonuses = false;
    addPreOrder = false;

    public Editor = ClassicEditor;

    public newsContent = '<p>Здесь будет ваша статья.</p>';

    categories: Category[];
    subCategories: SubCategory[];

    productStatuses: ProductStatus[];

    form: FormGroup;

    image: File;
    imagePreview: string | ArrayBuffer = '';

    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
            'category_id': new FormControl(null, [Validators.required]),
            'subCategory_id': new FormControl(null),
            'shortDescription': new FormControl(null, [Validators.required, Validators.minLength(80)]),
            'available': new FormControl(false),
            'discountStatus': new FormControl(false),
            'discountPercentValue': new FormControl(null),
            'productStatus_id': new FormControl(null),
            'price': new FormControl(null, [Validators.required]),
            'seoTitle': new FormControl(null),
            'seoDescription': new FormControl(null),
            'seoImagesAlt': new FormControl(null)
        });
        combineLatest(
            this.categoryService.getCategories(),
               this.productService.getProductStatuses()
        )
            .subscribe(
                (data: [Category[], ProductStatus[]]) => {
                    this.categories = data[0];
                    this.form.controls['category_id'].setValue(this.categories[0].id, {onlySelf: true});
                    this.subCategories = this.categories.find(c => c.id === this.categories[0].id).subCategories;
                    this.productStatuses = data[1];
                }
            );
    }

    onSubmit() {
        const formProduct = this.form.value;

        formProduct.discountStatus = this.addBonuses;
        formProduct.previewPhoto = this.image;
        formProduct.isSeo = this.addSeoInformation;

        console.log(this.addPreOrder);
        console.log(this.addBonuses);

        if (this.addPreOrder) {
            formProduct.productStatus_id = this.productStatuses.find(ps => ps.name === 'pre-order').id;
        } else if (this.addBonuses) {
            formProduct.productStatus_id = this.productStatuses.find(ps => ps.name === 'bonuses').id;
        } else {
            formProduct.productStatus_id = '';
        }
        console.log(formProduct);
        this.productService.newProduct(formProduct)
            .subscribe(
                (product: Product) => {
                    this.router.navigate(['/system/products'], {
                        queryParams: {
                            successCreate: true
                        }
                    });
                }
            );
    }

    onFileUpload(event: any) {
        const file = event.target.files[0];
        this.image = file;

        const reader = new FileReader();

        reader.onload = () => {
            this.imagePreview = reader.result;
        };

        reader.readAsDataURL(file);
    }

    triggerClick() {
        this.inputRef.nativeElement.click();
    }

    onSelectCategory(event: any) {
        this.subCategories = this.categories.find(c => c.id === +event.target.value).subCategories;
    }

    goBack() {
        this.router.navigate(['/system', 'products']);
    }

}
