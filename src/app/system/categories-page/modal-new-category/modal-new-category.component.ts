import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'smartmarket-modal-new-category',
  templateUrl: './modal-new-category.component.html',
  styleUrls: ['./modal-new-category.component.scss']
})
export class ModalNewCategoryComponent implements OnInit, OnDestroy {

  @Output() onModalClose = new EventEmitter();

  @Output() onCategoryAdd = new EventEmitter();

  form: FormGroup;

  aSub1: Subscription;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'slug': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  onSubmit() {
    // Prepare data
    const formCategory = this.form.value;
    this.aSub1 = this.categoryService.newCategory(formCategory)
      .subscribe(
        (category: Category) => {
          this.onCategoryAdd.emit(category);
          this.closeModal();
        }
      );
  }

  closeModal() {
    this.onModalClose.emit(false);
  }

  ngOnDestroy() {
    if (this.aSub1) {
      this.aSub1.unsubscribe();
    }
  }

}
