import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {InfoPageService} from '../shared/services/info-page.service';
import {InfoPage} from '../shared/interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Message} from '../../shared/models/message.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
    selector: 'smartmarket-info-page',
    templateUrl: './info-page.component.html',
    styleUrls: ['./info-page.component.scss'],
    animations: [fadeStateTrigger]
})
export class InfoPageComponent implements OnInit {

    currentPageName: string;

    pageTitle: string;
    pageContent = '<p>Содержимое</p>';

    editor = ClassicEditor;

    isLoaded = false;

    message: Message;

    constructor(
        private route: ActivatedRoute,
        private infoPageService: InfoPageService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.route.params
            .pipe(
                mergeMap((params: Params) => {
                    this.currentPageName = params['name'];
                    return this.infoPageService.getInfoPage(params['name']);
                })
            )
            .subscribe(
                (infoPage: InfoPage) => {
                    this.pageTitle = infoPage.title;
                    this.pageContent = infoPage.content;
                    this.isLoaded = true;
                }
            );

    }

    savePage() {
        this.isLoaded = false;
        this.infoPageService.editInfoPage({ title: this.pageTitle, content: this.pageContent }, this.currentPageName)
            .subscribe(
                (infoPage: InfoPage) => {
                    this.showMessage('Страница успешно сохранена', 'success');
                    this.isLoaded = true;
                }
            );
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
