import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category, SubCategory} from '../../shared/interfaces';
import {CategoryService} from '../../shared/services/category.service';
import {mergeMap} from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'smartmarket-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class NewCategoryComponent implements OnInit, OnDestroy {

  form: FormGroup;
  category: Category;

  currentSubCategory: SubCategory;
  isNewSubCategoryModal = false;

  deleteSubCategoryIsOpen = false;

  isLoaded = false;

  message: Message;

  aSub1: Subscription;
  aSub2: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.aSub1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.categoryService.getCategoryById(params['id']))
      )
      .subscribe(
        (category: Category) => {
          console.log(category);
          this.category = category;
          if (this.category.subCategories[0]) {
            this.currentSubCategory = this.category.subCategories[0];
          }
          this.isLoaded = true;
        }
      );
  }

  onCurrentSubCategoryHandle(subCategory: SubCategory) {
    this.currentSubCategory = subCategory;
  }

  onNewSubCategory(dir: boolean) {
    this.isNewSubCategoryModal = true;
  }

  goBack() {
    this.router.navigate(['/system', 'categories']);
  }

  onSuccessSubCategory(subCategory: SubCategory) {
    this.category.subCategories.push(subCategory);
    this.showMessage('Подкатегория успешно создана', 'success');
  }

  onModalClose(dir: boolean) {
    this.isNewSubCategoryModal = false;
  }

  onDeleteSubCategory(dir: boolean) {
    this.deleteSubCategoryIsOpen = dir;
  }

  onDeleteSubCategoryClose(dir: boolean) {
    this.deleteSubCategoryIsOpen = dir;
  }

  deleteSubCategory(success: boolean) {
    this.aSub2 = this.categoryService.deleteSubCategory(this.currentSubCategory.id)
      .subscribe(
        () => {
          this.deleteSubCategoryIsOpen = false;
          const index = this.category.subCategories.findIndex(subCat => subCat.id === this.currentSubCategory.id);
          this.category.subCategories.splice(index, 1);
          this.currentSubCategory = null;
          this.showMessage('Подкатегория успешно удалена', 'success');
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
    if (this.aSub2) {
      this.aSub2.unsubscribe();
    }
  }

}
