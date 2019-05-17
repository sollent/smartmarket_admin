import { Component, OnInit } from '@angular/core';
import {NewsCategory} from '../shared/interfaces';
import {NewsCategoryService} from '../shared/services/news-category.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {fadeFastStateTrigger} from '../../shared/animations/fade-fast.animation';

@Component({
  selector: 'smartmarket-news-categories-page',
  templateUrl: './news-categories-page.component.html',
  styleUrls: ['./news-categories-page.component.scss'],
  animations: [fadeStateTrigger, fadeFastStateTrigger]
})
export class NewsCategoriesPageComponent implements OnInit {

  newsCategories: NewsCategory[];

  isLoaded = false;

  constructor(
    private newsCategoryService: NewsCategoryService
  ) {}

  ngOnInit() {
    this.newsCategoryService.getNewsCategories()
      .subscribe(
        (newsCategories: NewsCategory[]) => {
          this.newsCategories = newsCategories;
          this.isLoaded = true;
        }
      );
  }

}
