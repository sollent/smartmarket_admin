import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SubCategory} from '../../../shared/interfaces';
import {CategoryService} from '../../../shared/services/category.service';
import {Message} from '../../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-new-sub-category',
    templateUrl: './new-sub-category.component.html',
    styleUrls: ['./new-sub-category.component.scss'],
    animations: [fadeStateTrigger]
})
export class NewSubCategoryComponent implements OnInit, OnDestroy, OnChanges {

    @Input() subCategory: SubCategory;

    @Output() onDeleteSubCategory = new EventEmitter();
    @Output() onNewSubCategory = new EventEmitter();

    form: FormGroup;

    message: Message;

    addSeoInformation = false;

    aSub1: Subscription;

    constructor(
        private router: Router,
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'slug': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'seoTitle': new FormControl(null),
            'seoDescription': new FormControl(null)
        });
        if (this.subCategory.seoInformation) {
            this.addSeoInformation = true;
            this.form.controls['seoTitle'].setValue(this.subCategory.seoInformation.title, {onlySelf: true});
            this.form.controls['seoDescription'].setValue(this.subCategory.seoInformation.description, {onlySelf: true});
        }
    }

    newSubCategoryAction() {
        this.onNewSubCategory.emit(true);
    }

    onSubmit() {
        const formSubCategory = this.subCategory;
        formSubCategory.name = this.form.value.name;
        formSubCategory.slug = this.form.value.slug;
        formSubCategory['seoTitle'] = this.form.value.seoTitle;
        formSubCategory['seoDescription'] = this.form.value.seoDescription;

        formSubCategory['isSeo'] = this.addSeoInformation;
        if (this.subCategory.seoInformation) {
            formSubCategory['seo_id'] = this.subCategory.seoInformation.id;
        }

        this.aSub1 = this.categoryService.editSubCategory(formSubCategory)
            .subscribe(
                (subCategory: SubCategory) => {
                    this.showMessage('Подкатегория успешно отредактированна', 'success');
                }
            );
    }

    deleteSubCategory() {
        this.onDeleteSubCategory.emit(true);
    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.form) {
            if (this.subCategory.seoInformation) {
                this.addSeoInformation = true;
                this.form.controls['seoTitle'].setValue(this.subCategory.seoInformation.title, {onlySelf: true});
                this.form.controls['seoDescription'].setValue(this.subCategory.seoInformation.description, {onlySelf: true});
            } else {
                this.form.controls['seoTitle'].reset();
                this.form.controls['seoDescription'].reset();
                this.addSeoInformation = false;
            }
        }
    }

    ngOnDestroy() {
        if (this.aSub1) {
            this.aSub1.unsubscribe();
        }
    }

}
