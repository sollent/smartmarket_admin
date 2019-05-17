import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {News, NewsCategory, NewsSubCategory} from '../../shared/interfaces';
import {NewsCategoryService} from '../../shared/services/news-category.service';
import {NewsService} from '../../shared/services/news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Globals from '../../../../globals';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {fadeFastStateTrigger} from '../../../shared/animations/fade-fast.animation';

@Component({
    selector: 'smartmarket-edit-news',
    templateUrl: './edit-news.component.html',
    styleUrls: ['./edit-news.component.scss'],
    animations: [fadeFastStateTrigger]
})
export class EditNewsComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef;
    @ViewChild('newsCategorySelect') newsCategorySelect: ElementRef;

    public Editor = ClassicEditor;

    public newsContent = '';

    form: FormGroup;

    newsCategories: NewsCategory[];
    newsSubCategories: NewsSubCategory[];

    addSubCategory = false;

    addSeoInformation = false;

    image: File;
    imagePreview: string | ArrayBuffer = '';

    imageAddress = Globals.images_news_address;

    article: News;

    isLoaded = false;

    constructor(
        private newsCategoryService: NewsCategoryService,
        private newsService: NewsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'title': new FormControl(null, [Validators.required, Validators.minLength(5)]),
            'shortDescription': new FormControl(null, [Validators.required, Validators.minLength(100)]),
            'main': new FormControl(false, [Validators.required]),
            'category_id': new FormControl(null, [Validators.required]),
            'subCategory_id': new FormControl(null),
            'likes': new FormControl(5),
            'seoTitle': new FormControl(null),
            'seoDescription': new FormControl(null),
            'overview': new FormControl(false)
        });

        combineLatest(
            this.route.params
                .pipe(
                    mergeMap((params: Params) => this.newsService.getNewsById(params['id']))
                ),
            this.newsCategoryService.getNewsCategories()
        )
            .subscribe(
                (data: [News, NewsCategory[]]) => {
                    this.article = data[0];
                    this.newsCategories = data[1];
                    this.newsContent = this.article.content;
                    this.isLoaded = true;
                    this.settingFormFields();
                    if (this.article.subCategory) {
                        this.addSubCategory = true;
                        this.form.controls['subCategory_id'].setValue(this.article.subCategory.id, {onlySelf: true});
                    }
                    if (this.article.seoInformation) {
                        this.addSeoInformation = true;
                        this.settingSeoFields();
                    }
                }
            );

    }

    onFileUpload(event: any) {
        const file = event.target.files[0];
        this.image = file;

        const reader = new FileReader();

        reader.onload = () => {
            this.imagePreview = reader.result;
        };

        reader.readAsDataURL(file);
    }

    triggerClick() {
        this.inputRef.nativeElement.click();
    }

    onSubmit() {
        this.isLoaded = false;
        const formNews = this.form.value;

        formNews.content = this.newsContent;
        formNews.category_id = this.newsCategorySelect.nativeElement.value;
        formNews.isSeo = this.addSeoInformation;
        if (this.article.seoInformation) {
            formNews.seo_id = this.article.seoInformation.id;
        }

        if (this.image) {
            formNews.previewImage = this.image;
        }

        this.newsService.editNews(formNews, +this.article.id)
            .subscribe(
                (news: News) => {
                    this.isLoaded = true;
                    this.router.navigate(['/system/news'], {
                       queryParams: {
                           successEdit: true
                       }
                    });
                }
            );
    }

    settingFormFields() {
        this.form.controls['category_id'].setValue(this.article.category.id, {onlySelf: true});
        this.form.controls['title'].setValue(this.article.title, {onlySelf: true});
        this.form.controls['shortDescription'].setValue(this.article.shortDescription, {onlySelf: true});
        this.form.controls['main'].setValue(this.article.main, {onlySelf: true});
        this.newsSubCategories = this.newsCategories.find(newsCat => newsCat.id === this.article.category.id).subCategories;
    }

    settingSeoFields() {
        this.form.controls['seoTitle'].setValue(this.article.seoInformation.title, {onlySelf: true});
        this.form.controls['seoDescription'].setValue(this.article.seoInformation.description, {onlySelf: true});
    }

    onSelectCategory(event: any) {
        this.newsSubCategories = this.newsCategories.find(newsCat => newsCat.id === +event.target.value).subCategories;
    }

    goBack() {
        this.router.navigate(['/system/news']);
    }

}
