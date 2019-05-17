import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {News} from '../../shared/interfaces';
import {NewsService} from '../../shared/services/news.service';
import {Router} from '@angular/router';

@Component({
  selector: 'smartmarket-modal-edit-product-article',
  templateUrl: './modal-edit-product-article.component.html',
  styleUrls: ['./modal-edit-product-article.component.scss']
})
export class ModalEditProductArticleComponent implements OnInit {

    @Input() articleModalEditOpen: boolean;
    @Input() currentProductId: number;
    @Output() onCloseArticleEditModal = new EventEmitter();
    @Output() onCloseArticleEditModalWithMessage = new EventEmitter();

    overviews: News[];

    currentOverviewId: number;

    isLoaded = false;

    constructor(
        private newsService: NewsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.newsService.getOverviews()
            .subscribe(
                (overviews: News[]) => {
                    this.overviews = overviews;
                    console.log(this.currentProductId);
                    for (let i = 0; i < overviews.length; i++) {
                        if (overviews[i].product) {
                            if (+overviews[i].product.id === +this.currentProductId) {
                                this.currentOverviewId = overviews[i].id;
                            }
                        }
                    }
                    this.isLoaded = true;
                }
            );
    }

    saveProductOverview() {
        this.newsService.setProductOverview(this.currentOverviewId, this.currentProductId)
            .subscribe(
                () => {
                    this.closeModalWithMessage('success');
                }
            );
    }

    onSelectOverview(event: any) {

    }

    closeModal() {
        this.onCloseArticleEditModal.emit(false);
    }

    closeModalWithMessage(message: string) {
        this.onCloseArticleEditModalWithMessage.emit(message);
    }

}
