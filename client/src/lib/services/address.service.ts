import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public create(client): Observable<Response> {
    return this.http.post(`${this.serverUrl}addresses`, client).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}addresses`).pipe(map((res: Response) => res));
  }

  public getByClientId(clientId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}addresses/getByClientId/${clientId}`).pipe(map((res: Response) => res));
  }

  public getById(clientId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}addresses/${clientId}`).pipe(map((res: Response) => res));
  }

  public update(address: any): Observable<any> {
    return this.http.put(`${this.serverUrl}addresses/${address.addressId}`, address).pipe(map((res: Response) => res));
  }

  public delete(clientId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}addresses/${clientId}`).pipe(map((res: Response) => res));
  }
}
