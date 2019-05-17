import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InfoPageService {

    constructor(
        private http: HttpClient
    ) {}

    getInfoPage(name: string): Observable<any> {
        return this.http.get(`/admin/info-page/${name}`);
    }

    editInfoPage(data: any, name: string): Observable<any> {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);

        return this.http.post(`/admin/info-page/edit/${name}`, formData);
    }

}