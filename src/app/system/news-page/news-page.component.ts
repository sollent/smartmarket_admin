import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../shared/services/news.service';
import {News} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Message} from '../../shared/models/message.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.scss'],
    animations: [fadeStateTrigger]
})
export class NewsPageComponent implements OnInit, OnDestroy {

    news: News[];

    aSub1: Subscription;
    aSub2: Subscription;

    isLoaded = false;

    message: Message;

    constructor(
        private newsService: NewsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.route.queryParams.subscribe(
            (params: Params) => {
                if (params['successEdit']) {
                    this.showMessage('Новость упешно отредактированна', 'success', '/system/news');
                } else if (params['successCreate']) {
                    this.showMessage('Новость упешно добавлена', 'success', '/system/news');
                }
            }
        );
        this.aSub1 = this.newsService.getNews()
            .subscribe(
                (news: News[]) => {
                    this.news = news;
                    this.isLoaded = true;
                }
            );
    }

    onRefresh() {
        this.isLoaded = false;
        this.aSub2 = this.newsService.getNews()
            .subscribe(
                (news: News[]) => {
                    this.news = news;
                    this.isLoaded = true;
                }
            );
    }

    ngOnDestroy() {
        if (this.aSub1) {
            this.aSub1.unsubscribe();
        }
        if (this.aSub2) {
            this.aSub2.unsubscribe();
        }
    }

    private showMessage(text: string, type: string = 'danger', redirect: string = '') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
            if (redirect !== '') {
                this.router.navigate([redirect]);
            }
        }, 5000);
    }

}
