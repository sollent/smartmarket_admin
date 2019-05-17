import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) {}

  getNews(): Observable<any> {
    return this.http.get('/admin/news');
  }

  getNewsById(newsId: number): Observable<any> {
    return this.http.get(`/admin/news/${newsId}`);
  }

  getOverviews(): Observable<any> {
      return this.http.get('/admin/news/overviews');
  }

  createNews(news: any): Observable<any> {
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('shortDescription', news.shortDescription);
    formData.append('isMain', Number(news.main).toString());
    formData.append('previewImage', news.previewImage);
    formData.append('isOverview', news.overview);
    formData.append('category_id', news['category_id'].toString());
    if (news['subCategory_id']) {
        formData.append('subCategory_id', news['subCategory_id'].toString());
    }
    formData.append('content', news.content);
    formData.append('likes', news.likes.toString());
    if (news.isSeo) {
        formData.append('isSeo', '1');
        formData.append('seoTitle', news.seoTitle);
        formData.append('seoDescription', news.seoDescription);
    } else {
        formData.append('isSeo', '0');
    }

    console.log(formData);

    return this.http.post('/admin/news/add', formData);
  }

  editNews(news: any, newsId: number): Observable<any> {
      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('shortDescription', news.shortDescription);
      formData.append('isMain', Number(news.main).toString());
      formData.append('isOverview', news.overview);
      if (news.previewImage) {
          formData.append('previewImage', news.previewImage);
      }
      formData.append('category_id', news['category_id'].toString());
      if (news['subCategory_id']) {
          formData.append('subCategory_id', news['subCategory_id'].toString());
      }
      formData.append('content', news.content);
      formData.append('likes', news.likes.toString());
      if (news.isSeo) {
          formData.append('isSeo', '1');
          formData.append('seoTitle', news.seoTitle);
          formData.append('seoDescription', news.seoDescription);
          if (news.seo_id) {
              formData.append('seo_id', news.seo_id);
          }
      } else {
          formData.append('isSeo', '0');
      }

      return this.http.post(`/admin/news/edit/${newsId}`, formData);
  }

    setProductOverview(overviewId: number, productId: number): Observable<any> {
      return this.http.get(`/admin/news/set-product-overview/${overviewId}/${productId}`);
    }

}
