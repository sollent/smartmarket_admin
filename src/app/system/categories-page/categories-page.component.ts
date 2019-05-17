import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../shared/interfaces';
import {CategoryService} from '../shared/services/category.service';
import {Message} from '../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {fadeFastStateTrigger} from '../../shared/animations/fade-fast.animation';

@Component({
  selector: 'smartmarket-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  animations: [fadeStateTrigger, fadeFastStateTrigger]
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

  modalIsOpen = false;
  deleteCategoryIsOpen = false;

  categories: Category[];

  deletedCategoryId: number;

  message: Message;

  isLoaded = false;

  aSub1: Subscription;
  aSub2: Subscription;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.message = new Message('danger', '');
    this.aSub1 = this.categoryService.getCategories()
      .subscribe(
        (categories: Category[]) => {
          console.log(categories);
          this.categories = categories;
          this.isLoaded = true;
        }
      );
  }

  private modalCategoryOpen(dir: boolean) {
    this.modalIsOpen = dir;
  }

  private deleteCategoryOpen(dir: boolean) {
    this.deleteCategoryIsOpen = dir;
  }

  openModal() {
    this.modalCategoryOpen(true);
  }

  openDeleteCategory(categoryId: number) {
    this.deletedCategoryId = categoryId;
    this.deleteCategoryOpen(true);
  }

  closeCategoryModal(dir: boolean) {
    this.modalCategoryOpen(dir);
  }

  closeDeleteCategory() {
    this.deleteCategoryOpen(false);
  }

  onCategoryAdd(category: Category) {
    this.categories.push(category);
    this.showMessage('Категория успешно добавлена', 'success');
  }

  deleteCategory() {
    this.aSub2 = this.categoryService.deleteCategory(this.deletedCategoryId)
      .subscribe(
        () => {
          const index = this.categories.findIndex(c => c.id === this.deletedCategoryId);
          this.categories.splice(index, 1);
          this.closeDeleteCategory();
          this.showMessage('Категория успешно удалена', 'success');
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
