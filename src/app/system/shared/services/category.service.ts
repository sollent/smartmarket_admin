import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category, SubCategory} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient
    ) {
    }

    // Categories

    getCategories(): Observable<any> {
        return this.http.get('/admin/category');
    }

    getCategoryById(categoryId: number): Observable<any> {
        return this.http.get(`/admin/category/${categoryId}`);
    }

    newCategory(category: Category): Observable<any> {
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('slug', category.slug);
        return this.http.post('/admin/category/new', formData);
    }

    editCategory(category: Category): Observable<any> {
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('slug', category.slug);
        return this.http.post(`/admin/category/edit/${category.id}`, formData);
    }

    deleteCategory(categoryId: number): Observable<any> {
        return this.http.delete(`/admin/category/delete/${categoryId}`);
    }

    // SubCategories

    newSubCategory(subCategory: any, categoryId: number): Observable<any> {
        const formData = new FormData();
        formData.append('name', subCategory.name);
        formData.append('slug', subCategory.slug);
        if (subCategory.isSeo) {
            formData.append('isSeo', '1');
            formData.append('seoTitle', subCategory.seoTitle);
            formData.append('seoDescription', subCategory.seoDescription);
            if (subCategory.seo_id) {
                formData.append('seo_id', subCategory.seo_id);
            }
        } else {
            formData.append('isSeo', '0');
        }
        return this.http.post(`/admin/sub-category/new/${categoryId}`, formData);
    }

    editSubCategory(subCategory: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', subCategory.name);
        formData.append('slug', subCategory.slug);
        if (subCategory.isSeo) {
            formData.append('isSeo', '1');
            formData.append('seoTitle', subCategory.seoTitle);
            formData.append('seoDescription', subCategory.seoDescription);
            if (subCategory.seo_id) {
                formData.append('seo_id', subCategory.seo_id);
            }
        } else {
            formData.append('isSeo', '0');
        }
        return this.http.post(`/admin/sub-category/edit/${subCategory.id}`, formData);
    }

    deleteSubCategory(subCategoryId: number): Observable<any> {
        return this.http.delete(`/admin/sub-category/delete/${subCategoryId}`);
    }

}
