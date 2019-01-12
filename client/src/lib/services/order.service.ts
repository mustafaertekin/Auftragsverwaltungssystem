import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public createOrder(order): Observable<any> {
    return this.http.post(`${this.serverUrl}orders`, order).pipe(map((res: Response) => res));
  }

  public saveStatus(state): Observable<any> {
    return this.http.post(`${this.serverUrl}orders/status`, state).pipe(map((res: Response) => res));
  }

  public comment(comment): Observable<any> {
    return this.http.post(`${this.serverUrl}orders/comment`, comment).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}orders`).pipe(map((res: Response) => res));
  }

  public getById(orderId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}orders/${orderId}`).pipe(map((res: Response) => res));
  }

  public updateOrder(orderId: string, order: any): Observable<any> {
    return this.http.put(`${this.serverUrl}orders/${orderId}`, order).pipe(map((res: Response) => res));
  }

  public deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}orders/${orderId}`).pipe(map((res: Response) => res));
  }

  public download(orderId): Observable<any> {
    return this.http.get(`${this.serverUrl}orders/download/${orderId}`, { responseType: 'blob' });
  }

  public mail(orderId): Observable<any> {
    return this.http.post(`${this.serverUrl}orders/mail/${orderId}`, {}).pipe(map((res: Response) => res));
  }

  public getByText(text: string): Observable<any> {
    return this.http.get(`${this.serverUrl}orders/search/${text}`).pipe(map((res: Response) => res));
  }
}
