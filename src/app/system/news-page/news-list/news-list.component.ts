import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../shared/interfaces';
import {fadeFastStateTrigger} from '../../../shared/animations/fade-fast.animation';
import * as Globals from '../../../../globals';

@Component({
  selector: 'smartmarket-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  animations: [fadeFastStateTrigger]
})
export class NewsListComponent implements OnInit {

  @Input() news: News[];

  imageSource = Globals.images_news_address;

  constructor() { }

  ngOnInit() {
  }

}
