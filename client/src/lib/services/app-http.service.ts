import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppHttpService {
  private headers: HttpHeaders;
  private serverUrl: string;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
  }

  post(endpoint, data): Observable<any> {
    return this.http.post(`${this.serverUrl}${endpoint}`, data);
  }

  get(endpoint): Observable<any> {
    return this.http.get(`${this.serverUrl}${endpoint}`);
  }

  
}
