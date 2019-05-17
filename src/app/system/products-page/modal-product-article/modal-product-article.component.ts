import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {News} from '../../shared/interfaces';
import {NewsService} from '../../shared/services/news.service';
import {Router} from '@angular/router';

@Component({
    selector: 'smartmarket-modal-product-article',
    templateUrl: './modal-product-article.component.html',
    styleUrls: ['./modal-product-article.component.scss']
})
export class ModalProductArticleComponent implements OnInit {

    @Input() articleModalOpen: boolean;
    @Input('currentProductId') productId: number;
    @Output() onCloseArticleModal = new EventEmitter();
    @Output() onCloseArticleModalWithMessage = new EventEmitter();

    overviews: News[];

    currentOverviewId: number;

    constructor(
        private newsService: NewsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.newsService.getOverviews()
            .subscribe(
                (overviews: News[]) => {
                    this.overviews = overviews;
                }
            );
    }

    saveProductOverview() {
        this.newsService.setProductOverview(this.currentOverviewId, this.productId)
            .subscribe(
                () => {
                    this.closeModalWithMessage('success');
                }
            );
    }

    onSelectOverview(event: any) {

    }

    closeModal() {
        this.onCloseArticleModal.emit(false);
    }

    closeModalWithMessage(message: string) {
        this.onCloseArticleModalWithMessage.emit(message);
    }

}
