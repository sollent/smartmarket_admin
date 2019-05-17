import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {ProductsPageComponent} from './products-page/products-page.component';
import {NewsPageComponent} from './news-page/news-page.component';
import {SettingPageComponent} from './setting-page/setting-page.component';
import {AuthGuard} from '../shared/classes/auth.guard';
import {OrderDetailComponent} from './order-page/order-detail/order-detail.component';
import {NewProductComponent} from './products-page/new-product/new-product.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {NewCategoryComponent} from './categories-page/new-category/new-category.component';
import {NewsCategoriesPageComponent} from './news-categories-page/news-categories-page.component';
import {CreateNewsComponent} from './news-page/create-news/create-news.component';
import {EditNewsComponent} from './news-page/edit-news/edit-news.component';
import {EditProductComponent} from './products-page/edit-product/edit-product.component';
import {NewProductPhotosComponent} from './products-page/new-product-photos/new-product-photos.component';
import {NewProductCharacteristicsComponent} from './products-page/new-product-characteristics/new-product-characteristics.component';
import {InfoPageComponent} from './info-page/info-page.component';
import {EditProductPhotosComponent} from './products-page/edit-product-photos/edit-product-photos.component';

const routes: Routes = [
    {
        path: 'system', component: SystemComponent, canActivate: [AuthGuard], children: [
            {path: 'order', component: OrderPageComponent},
            {path: 'products', component: ProductsPageComponent},
            {path: 'products/new', component: NewProductComponent},
            {path: 'product/new/photos/:id', component: NewProductPhotosComponent},
            {path: 'product/edit/photos/:id', component: EditProductPhotosComponent},
            {path: 'product/new/characteristics/:id', component: NewProductCharacteristicsComponent},
            {path: 'product/edit/:id', component: EditProductComponent},
            {path: 'categories', component: CategoriesPageComponent},
            {path: 'categories/new/:id', component: NewCategoryComponent},
            {path: 'news', component: NewsPageComponent},
            {path: 'news/create', component: CreateNewsComponent},
            {path: 'news/edit/:id', component: EditNewsComponent},
            {path: 'news-categories', component: NewsCategoriesPageComponent},
            {path: 'setting', component: SettingPageComponent},
            {path: 'order/:id', component: OrderDetailComponent},
            {path: 'info-page/:name', component: InfoPageComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SystemRoutingModule {
}
