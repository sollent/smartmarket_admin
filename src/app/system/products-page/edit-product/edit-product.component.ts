import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Category, News, Product, ProductStatus, SubCategory} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {ProductService} from '../../shared/services/product.service';
import {combineLatest, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import * as Globals from '../../../../globals';
import {Message} from '../../../shared/models/message.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss'],
    animations: [fadeStateTrigger]
})
export class EditProductComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef;

    articleModalOpen = false;
    articleModalEditOpen = false;

    addSubCategory = false;
    addSeoInformation = false;
    addBonuses = false;
    addPreOrder = false;

    product: Product;
    categories: Category[];
    subCategories: SubCategory[];

    productStatuses: ProductStatus[];

    form: FormGroup;

    image: File;
    imagePreview: string | ArrayBuffer = '';

    message: Message;

    isLoaded = false;

    photosIsComplete = false;
    articleIsComplete = false;
    characteristicsIsComplete = false;

    currentProductId: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
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
            this.route.params
                .pipe(
                    mergeMap((params: Params) => this.productService.getProductById(params['id'])),
                ),
            this.route.queryParams,
            this.categoryService.getCategories(),
            this.productService.getProductStatuses(),
        )
            .subscribe(
                (data: [Product, Params, Category[], ProductStatus[]]) => {
                    this.product = data[0];
                    if (this.product.photos.length > 0) {
                        this.photosIsComplete = true;
                    }
                    if (this.product.characteristics.length > 0) {
                        this.characteristicsIsComplete = true;
                    }
                    if (this.product.seoInformation) {
                        this.addSeoInformation = true;
                        this.settingSeoInformation();
                    }
                    console.log(data[0]);
                    if (data[1]['successCreatePhotos']) {
                        this.showMessage('Фотографии успешно добавлены', 'success', `/system/product/edit/${this.product.id}`);
                    } else if (data[1]['successCreateCharacteristics']) {
                        this.showMessage('Характеристики успешно добавлены', 'success', `/system/product/edit/${this.product.id}`);
                    } else if (data[1]['successEditPhotos']) {
                        this.showMessage('Фотографии успешно сохранены', 'success', `/system/product/edit/${this.product.id}`);
                    }
                    this.productService.getProductOverviews(this.product.id)
                        .subscribe((overviews: News[]) => {
                            if (overviews.length > 0) {
                                this.articleIsComplete = true;
                            }
                        });
                    this.settingFormFields();
                    this.categories = data[2];
                    this.productStatuses = data[3];
                    this.currentProductId = this.product.id;
                    this.isLoaded = true;
                }
            );
    }

    onSubmit() {
        const formProduct = this.form.value;
        formProduct.discountStatus = this.addBonuses;
        formProduct.subCategory_id = this.form.controls['subCategory_id'].value;
        if (this.image) {
            formProduct.previewPhoto = this.image;
        }
        formProduct.isSeo = this.addSeoInformation;
        if (this.product.seoInformation) {
            formProduct.seo_id = this.product.seoInformation.id;
        }
        if (this.addPreOrder) {
            formProduct.productStatus_id = this.productStatuses.find(ps => ps.name === 'pre-order').id;
        } else if (this.addBonuses) {
            formProduct.productStatus_id = this.productStatuses.find(ps => ps.name === 'bonuses').id;
        } else {
            formProduct.productStatus_id = '';
        }
        console.log(formProduct);
        this.productService.editProduct(formProduct, this.product.id)
            .subscribe(
                (product: Product) => {
                    this.router.navigate(['/system/products'], {
                        queryParams: {
                            successEdit: true
                        }
                    });
                }
            );
    }

    settingFormFields() {
        if (this.product.previewPhoto) {
            this.imagePreview = Globals.images_product_address + this.product.previewPhoto;
        }
        this.form.controls['name'].setValue(this.product.name, {onlySelf: true});
        this.form.controls['category_id'].setValue(this.product.category.parentCategory.id, {onlySelf: true});
        if (this.product.category) {
            this.addSubCategory = true;
            this.form.controls['subCategory_id'].setValue(this.product.category.id, {onlySelf: true});
            this.subCategories = this.product.category.parentCategory.subCategories;
        }
        this.form.controls['shortDescription'].setValue(this.product.shortDescription, {onlySelf: true});
        this.form.controls['available'].setValue(this.product.available, {onlySelf: true});
        this.addBonuses = this.product.discountStatus;
        this.form.controls['discountStatus'].setValue(this.product.discountStatus, {onlySelf: true});
        this.form.controls['discountPercentValue'].setValue(this.product.discountPercentValue, {onlySelf: true});
        this.form.controls['productStatus_id'].setValue(this.product.productStatus.id, {onlySelf: true});
        if (this.product.productStatus.name === 'pre-order') {
            this.addPreOrder = true;
        }
        this.form.controls['price'].setValue(this.product.price, {onlySelf: true});
    }

    settingSeoInformation() {
        this.form.controls['seoTitle'].setValue(this.product.seoInformation.title, {onlySelf: true});
        this.form.controls['seoDescription'].setValue(this.product.seoInformation.description, {onlySelf: true});
        this.form.controls['seoImagesAlt'].setValue(this.product.seoInformation.imagesAlt, {onlySelf: true});
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
        this.form.controls['subCategory_id'].setValue(this.subCategories[0].id, {onlySelf: true});
    }

    onArticleModalOpen() {
        this.articleModalOpen = true;
    }

    onArticleEditModalOpen() {
        this.articleModalEditOpen = true;
    }

    onCloseArticleModal() {
        this.articleModalOpen = false;
    }

    onCloseArticleModalWithMessage(message: string) {
        this.articleModalOpen = false;
        if (message === 'success') {
            this.showMessage('Статья успешно добавлена на страницу продукта', 'success');
            this.articleIsComplete = true;
        }
    }

    onCloseArticleEditModal() {
        this.articleModalEditOpen = false;
    }

    onCloseArticleEditModalWithMessage(message: string) {
        this.articleModalEditOpen = false;
        if (message === 'success') {
            this.showMessage('Статья успешно сохранена на странице продукта', 'success');
            this.articleIsComplete = true;
        }
    }

    goBack() {
        this.router.navigate(['/system', 'products']);
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
