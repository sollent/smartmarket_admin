import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'smartmarket-modal-delete-sub-category',
  templateUrl: './modal-delete-sub-category.component.html',
  styleUrls: ['./modal-delete-sub-category.component.scss']
})
export class ModalDeleteSubCategoryComponent implements OnInit {

  @Input() deleteSubCategoryIsOpen = false;

  @Output() onDeleteSubCategoryClose = new EventEmitter();
  @Output() onDeleteSubCategory = new EventEmitter();

  constructor(
  ) {}

  closeDeleteSubCategory() {
    this.onDeleteSubCategoryClose.emit(false);
  }

  deleteSubCategory() {
    this.onDeleteSubCategory.emit(true);
  }

  ngOnInit() {
  }

}
