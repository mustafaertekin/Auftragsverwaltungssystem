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
export class OrderItemService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public get(): Observable<any> {
    return this.http.get(`${this.serverUrl}order-service`).pipe(map((res: Response) => res));
  }

  public getByOrderId(orderId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}order-service/getByOrderId/${orderId}`).pipe(map((res: Response) => res));
  }

  public createOrderService(service): Observable<any> {
    return this.http.post(`${this.serverUrl}order-service`, service).pipe(map((res: Response) => res));
  }

  public updateItem(updateService): Observable<any> {
    return this.http.put(`${this.serverUrl}order-service`, updateService).pipe(map((res: Response) => res));
  }

  public deleteOrderService(orderServiceId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}order-service/${orderServiceId}`).pipe(map((res: Response) => res));
  }
}
