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
export class ClientService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public createClient(client): Observable<any> {
    return this.http.post(`${this.serverUrl}clients`, client).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}clients`).pipe(map((res: Response) => res));
  }

  public getById(clientId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}clients/${clientId}`).pipe(map((res: Response) => res));
  }

  public updateClient(clientId: string, client: any): Observable<any> {
    return this.http.put(`${this.serverUrl}clients/${clientId}`, client).pipe(map((res: Response) => res));
  }
}
