import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) {}

  getOrders(): Observable<any> {
    return this.http.get('/admin/order');
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`/admin/order/${id}`);
  }

}
