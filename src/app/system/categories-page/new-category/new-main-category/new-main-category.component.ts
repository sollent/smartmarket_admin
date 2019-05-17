import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category, SubCategory} from '../../../shared/interfaces';
import {CategoryService} from '../../../shared/services/category.service';
import {Message} from '../../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-new-main-category',
    templateUrl: './new-main-category.component.html',
    styleUrls: ['./new-main-category.component.scss'],
    animations: [fadeStateTrigger]
})
export class NewMainCategoryComponent implements OnInit, OnDestroy {

    @Output() onCategoryAdd = new EventEmitter();
    @Output() onCurrentSubCategory = new EventEmitter();

    @Input() category: Category;

    form: FormGroup;

    message: Message;

    currentSubCategoryId = 1;
    currentSubCategory: SubCategory;

    aSub1: Subscription;

    constructor(
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'slug': new FormControl(null, [Validators.required, Validators.minLength(2)]),
        });
    }

    onSubCategoryChange() {
        this.currentSubCategory = this.category.subCategories.find(subCat => subCat.id === +this.currentSubCategoryId);
        this.onCurrentSubCategory.emit(this.currentSubCategory);
    }

    onSubmit() {
        const formCategory = this.category;
        formCategory.name = this.form.value.name;
        formCategory.slug = this.form.value.slug;

        this.aSub1 = this.categoryService.editCategory(formCategory)
            .subscribe(
                (category: Category) => {
                    console.log(category);
                    this.showMessage('Категория успешно сохранена', 'success');
                }
            );
    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    ngOnDestroy() {
        if (this.aSub1) {
            this.aSub1.unsubscribe();
        }
    }

}
