import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../shared/services/category.service';
import {SubCategory} from '../../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
    selector: 'smartmarket-modal-sub-category',
    templateUrl: './modal-sub-category.component.html',
    styleUrls: ['./modal-sub-category.component.scss']
})
export class ModalSubCategoryComponent implements OnInit, OnDestroy {

    @Input('isNewSubCategoryModal') openModal = false;

    @Output() onModalClose = new EventEmitter();
    @Output() successSubCategory = new EventEmitter();

    form: FormGroup;

    addSeoInformation = false;

    aSub1: Subscription;

    @Input() currentCategoryId: number;

    constructor(
        private categoryService: CategoryService
    ) {
    }

    closeModal() {
        this.onModalClose.emit(false);
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'slug': new FormControl(null, [Validators.required, Validators.minLength(2)]),
            'seoTitle': new FormControl(null),
            'seoDescription': new FormControl(null)
        });
    }

    onSubmit() {
        const formSubCategory = this.form.value;

        formSubCategory['isSeo'] = this.addSeoInformation;
        this.aSub1 = this.categoryService.newSubCategory(formSubCategory, this.currentCategoryId)
            .subscribe(
                (subCategory: SubCategory) => {
                    console.log(subCategory);
                    this.form.reset();
                    this.closeModal();
                    this.successSubCategory.emit(subCategory);
                }
            );
    }

    ngOnDestroy() {
        if (this.aSub1) {
            this.aSub1.unsubscribe();
        }
    }

}
