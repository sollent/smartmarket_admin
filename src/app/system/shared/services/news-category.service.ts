import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsCategoryService {

  constructor(
    private http: HttpClient
  ) {}

  getNewsCategories(): Observable<any> {
    return this.http.get('/admin/news/categories');
  }

}
