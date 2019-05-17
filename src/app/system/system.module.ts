import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import { OrdersListComponent } from './order-page/orders-list/orders-list.component';
import { OrderDetailComponent } from './order-page/order-detail/order-detail.component';
import { NewProductComponent } from './products-page/new-product/new-product.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { NewCategoryComponent } from './categories-page/new-category/new-category.component';
import { NewSubCategoryComponent } from './categories-page/new-category/new-sub-category/new-sub-category.component';
import { NewMainCategoryComponent } from './categories-page/new-category/new-main-category/new-main-category.component';
import { ModalNewCategoryComponent } from './categories-page/modal-new-category/modal-new-category.component';
import { ModalSubCategoryComponent } from './categories-page/new-category/modal-sub-category/modal-sub-category.component';
import { ModalDeleteSubCategoryComponent } from './categories-page/new-category/modal-delete-sub-category/modal-delete-sub-category.component';
import { NewsCategoriesPageComponent } from './news-categories-page/news-categories-page.component';
import { NewsListComponent } from './news-page/news-list/news-list.component';
import { CreateNewsComponent } from './news-page/create-news/create-news.component';
import { EditNewsComponent } from './news-page/edit-news/edit-news.component';
import { ProductsListComponent } from './products-page/products-list/products-list.component';
import { EditProductComponent } from './products-page/edit-product/edit-product.component';
import { NewProductPhotosComponent } from './products-page/new-product-photos/new-product-photos.component';
import { ModalProductArticleComponent } from './products-page/modal-product-article/modal-product-article.component';
import { NewProductCharacteristicsComponent } from './products-page/new-product-characteristics/new-product-characteristics.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { ModalEditProductArticleComponent } from './products-page/modal-edit-product-article/modal-edit-product-article.component';
import { EditProductPhotosComponent } from './products-page/edit-product-photos/edit-product-photos.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const socketConfig: SocketIoConfig = { url: 'ws://localhost:8080', options: {} };

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
      SocketIoModule.forRoot(socketConfig)
  ],
  providers: [

  ],
  declarations: [
    OrderPageComponent,
    ProductsPageComponent,
    NewsPageComponent,
    SettingPageComponent,
    SystemComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    OrdersListComponent,
    OrderDetailComponent,
    NewProductComponent,
    CategoriesPageComponent,
    NewCategoryComponent,
    NewSubCategoryComponent,
    NewMainCategoryComponent,
    ModalNewCategoryComponent,
    ModalSubCategoryComponent,
    ModalDeleteSubCategoryComponent,
    NewsCategoriesPageComponent,
    NewsListComponent,
    CreateNewsComponent,
    EditNewsComponent,
    ProductsListComponent,
    EditProductComponent,
    NewProductPhotosComponent,
    ModalProductArticleComponent,
    NewProductCharacteristicsComponent,
    InfoPageComponent,
    ModalEditProductArticleComponent,
    EditProductPhotosComponent
  ]
})

export class SystemModule {}
