import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {mergeMap} from 'rxjs/operators';
import {ProductPhoto} from '../../shared/interfaces';
import * as Globals from '../../../../globals';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'smartmarket-edit-product-photos',
  templateUrl: './edit-product-photos.component.html',
  styleUrls: ['./edit-product-photos.component.scss']
})
export class EditProductPhotosComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef;

    images: File[] = [];
    imagesPreview: any[] = [];

    productId: number;
    productPhotos: ProductPhoto[];

    deletedImages = [];

    imagesSource = Globals.images_product_address;

    isLoaded = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.route.params
            .pipe(
                mergeMap((params: Params) => {
                    this.productId = +params['id'];
                   return this.productService.getProductPhotos(+params['id']);
                })
            )
            .subscribe((photos: ProductPhoto[]) => {
                this.productPhotos = photos;
                this.productPhotos.forEach((photo) => {
                  this.imagesPreview.push({
                      type: 'loaded',
                      image: photo.image
                  });
                });
                this.isLoaded = true;
            });
    }

    saveImages() {
        combineLatest(
            this.productService.deleteProductPhotos(this.deletedImages, this.productId),
            this.productService.newProductPhotos(this.images, this.productId)
        )
          .subscribe(
              () => {
                  this.router.navigate(['/system/product/edit', this.productId], {
                      queryParams: {
                          successEditPhotos: true
                      }
                  });
                  this.isLoaded = true;
              }
          );
    }

    deleteImage(image: any) {
        const imageId = this.productPhotos.find(photo => photo.image === image.image).id;
        this.deletedImages.push(imageId);
        const deletedIndex = this.imagesPreview.findIndex(im => im.image === image.image);
        this.imagesPreview.splice(deletedIndex, 1);
    }

    onFileUpload(event: any) {

        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            this.images.push(files[i]);

            const reader = new FileReader();

            reader.onload = () => {
                this.imagesPreview.push({
                    type: 'local',
                    image: reader.result
                });
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
