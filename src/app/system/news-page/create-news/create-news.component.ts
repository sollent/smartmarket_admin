import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {News, NewsCategory, NewsSubCategory} from '../../shared/interfaces';
import {NewsCategoryService} from '../../shared/services/news-category.service';
import {NewsService} from '../../shared/services/news.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {Router} from '@angular/router';

@Component({
    selector: 'smartmarket-create-news',
    templateUrl: './create-news.component.html',
    styleUrls: ['./create-news.component.scss'],
    animations: [fadeStateTrigger]
})
export class CreateNewsComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef;

    public Editor = ClassicEditor;

    public newsContent = '<p>Здесь будет ваша статья.</p>';

    form: FormGroup;

    newsCategories: NewsCategory[];
    newsSubCategories: NewsSubCategory[];

    image: File;
    imagePreview: string | ArrayBuffer = '';

    addSubCategory = false;
    addSeoInformation = false;


    constructor(
        private newsCategoryService: NewsCategoryService,
        private newsService: NewsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'title': new FormControl(null, [Validators.required, Validators.minLength(5)]),
            'shortDescription': new FormControl(null, [Validators.required, Validators.minLength(100)]),
            'main': new FormControl(false),
            'category_id': new FormControl(null, [Validators.required]),
            'subCategory_id': new FormControl(null),
            'likes': new FormControl(5),
            'seoTitle': new FormControl(null),
            'seoDescription': new FormControl(null),
            'overview': new FormControl(false)
        });
        this.newsCategoryService.getNewsCategories()
            .subscribe(
                (newsCategories: NewsCategory[]) => {
                    this.newsCategories = newsCategories;
                    this.form.controls['category_id'].setValue(newsCategories[0].id, {onlySelf: true});
                    this.newsSubCategories = this.newsCategories.find(newsCat => newsCat.id === newsCategories[0].id).subCategories;
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
        console.log(this.form);
        const formNews = this.form.value;

        formNews.previewImage = this.image;
        formNews.content = this.newsContent;
        formNews.isSeo = this.addSeoInformation;

        this.newsService.createNews(formNews)
            .subscribe(
                (news: News) => {
                    this.router.navigate(['/system/news'], {
                        queryParams: {
                            successCreate: true
                        }
                    });
                }
            );
    }

    onSelectCategory(event: any) {
        this.newsSubCategories = this.newsCategories.find(newsCat => newsCat.id === +event.target.value).subCategories;
    }

    goBack() {
        this.router.navigate(['/system/news']);
    }
}
