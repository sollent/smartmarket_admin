import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient
    ) {}

    getProducts(): Observable<any> {
        return this.http.get('/admin/product');
    }

    getProductById(productId: number): Observable<any> {
        return this.http.get(`/admin/product/${productId}`);
    }

    newProduct(formProducts: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', formProducts.name);
        formData.append('category_id', formProducts.category_id);
        formData.append('subCategory_id', formProducts.subCategory_id);
        formData.append('shortDescription', formProducts.shortDescription);
        formData.append('available', Number(formProducts.available).toString());
        if (formProducts.isSeo) {
            formData.append('isSeo', '1');
            formData.append('seoTitle', formProducts.seoTitle);
            formData.append('seoDescription', formProducts.seoDescription);
            formData.append('seoImagesAlt', formProducts.seoImagesAlt);
            if (formProducts.seo_id) {
                formData.append('seo_id', formProducts.seo_id);
            }
        } else {
            formData.append('isSeo', '0');
        }
        if (formProducts.discountStatus) {
            formData.append('discountStatus', formProducts.discountStatus);
            formData.append('discountPercentValue', formProducts.discountPercentValue);
        }
        if (formProducts.productStatus_id !== '') {
            formData.append('productStatus_id', formProducts.productStatus_id);
        }
        formData.append('price', formProducts.price);
        formData.append('previewPhoto', formProducts.previewPhoto);

        return this.http.post('/admin/product/new', formData);
    }

    getProductStatuses(): Observable<any> {
        return this.http.get('/admin/product/statuses');
    }

    getProductOverviews(productId: number): Observable<any> {
        return this.http.get(`/admin/product/overviews/${productId}`);
    }

    getProductPhotos(productId: number): Observable<any> {
        return this.http.get(`/admin/product/photos/${productId}`);
    }

    editProduct(formProducts: any, productId: number): Observable<any> {
        const formData = new FormData();
        formData.append('name', formProducts.name);
        formData.append('category_id', formProducts.category_id);
        formData.append('subCategory_id', formProducts.subCategory_id);
        formData.append('shortDescription', formProducts.shortDescription);
        formData.append('available', Number(formProducts.available).toString());
        if (formProducts.isSeo) {
            formData.append('isSeo', '1');
            formData.append('seoTitle', formProducts.seoTitle);
            formData.append('seoDescription', formProducts.seoDescription);
            formData.append('seoImagesAlt', formProducts.seoImagesAlt);
            if (formProducts.seo_id) {
                formData.append('seo_id', formProducts.seo_id);
            }
        } else {
            formData.append('isSeo', '0');
        }
        if (formProducts.discountStatus) {
            formData.append('discountStatus', formProducts.discountStatus);
            formData.append('discountPercentValue', formProducts.discountPercentValue);
        }
        if (formProducts.productStatus_id !== '') {
            formData.append('productStatus_id', formProducts.productStatus_id);
        }
        formData.append('price', formProducts.price);
        if (formProducts.previewPhoto) {
            formData.append('previewPhoto', formProducts.previewPhoto);
        }

        return this.http.post(`/admin/product/edit/${productId}`, formData);
    }

    newProductPhotos(images: any[], productId: number): Observable<any> {
        const formData = new FormData();

        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append(`images[${i}]`, images[i]);
            }
        }

        return this.http.post(`/admin/product/add/photos/${productId}`, formData);
    }

    deleteProductPhotos(deletedImages: any[], productId: number): Observable<any> {
        const formData = new FormData();
        formData.append('deletedImages', JSON.stringify(deletedImages));
        return this.http.post(`/admin/product/delete-photos/${productId}`, formData);
    }

    newProductCharacteristics(characteristics: any[], productId: number): Observable<any> {
        const formData = new FormData();
        for (let i = 0; i < characteristics.length; i++) {
            formData.append(`characteristics[${i}][property]`, characteristics[i]['name']);
            for (let j = 0; j < characteristics[i]['chars'].length; j++) {
                formData.append(`characteristics[${i}][values][${j}][key]`, characteristics[i]['chars'][j]['key']);
                formData.append(`characteristics[${i}][values][${j}][value]`, characteristics[i]['chars'][j]['value']);
            }
        }

        return this.http.post(`/admin/product/add/characteristics/${productId}`, formData);
    }
}