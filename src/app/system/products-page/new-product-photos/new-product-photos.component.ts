import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';

@Component({
    selector: 'smartmarket-new-product-photos',
    templateUrl: './new-product-photos.component.html',
    styleUrls: ['./new-product-photos.component.scss']
})
export class NewProductPhotosComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef;

    images: File[] = [];
    imagesPreview: any[] = [];

    productId: number;

    isLoaded = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
           this.productId = +params['id'];
        });
    }

    saveImages() {
        this.isLoaded = false;
        this.productService.newProductPhotos(this.images, this.productId)
            .subscribe(
                (data) => {
                    this.router.navigate(['/system/product/edit', this.productId], {
                        queryParams: {
                            successCreatePhotos: true
                        }
                    });
                    this.isLoaded = true;
                }
            );
    }

    onFileUpload(event: any) {

        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            this.images.push(files[i]);

            const reader = new FileReader();

            reader.onload = () => {
                this.imagesPreview.push(reader.result);
            };

            reader.readAsDataURL(files[i]);
        }

        console.log(this.images);
        console.log(this.imagesPreview);

    }

    triggerClick() {
        this.inputRef.nativeElement.click();
    }

    goBack() {
        this.router.navigate(['/system/product/edit', this.productId]);
    }
}
