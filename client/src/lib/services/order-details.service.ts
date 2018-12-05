import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderDetails } from '@avs-ecosystem/models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public create(order: OrderDetails, orderId: string): Observable<Response> {
    return this.http.post(`${this.serverUrl}orders/${orderId}`, order).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}orders`).pipe(map((res: Response) => res));
  }

  public getAllByOrderId(orderId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}orders/getAllByOrderId/${orderId}`).pipe(map((res: Response) => res));
  }

  public update(order: any): Observable<any> {
    return this.http.put(`${this.serverUrl}orders/${order.orderId}`, order).pipe(map((res: Response) => res));
  }

  public delete(orderId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}orders/${orderId}`).pipe(map((res: Response) => res));
  }
}
