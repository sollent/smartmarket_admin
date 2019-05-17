import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './components/loader.component';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
    declarations: [LoaderComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        LoaderComponent,
        CKEditorModule
    ]
})

export class SharedModule {
}
