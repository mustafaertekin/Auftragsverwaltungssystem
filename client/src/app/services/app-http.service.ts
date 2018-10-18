import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AppHttpService {
  private headers: HttpHeaders;
  private serverUrl: string;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    // this.serverUrl = 'http://localhost:3001/';
    this.serverUrl = 'http://104.248.32.52:3001/';
    this.createAuthorizationHeader();
  }

  createAuthorizationHeader() {
    this.headers = new HttpHeaders();
    if (this.tokenService.getToken()) {
      const token = this.tokenService.getToken();
      this.headers.set('Authorization', `${token.token_type} ${token.access_token}`);
    }
  }

  post(endpoint, data): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.post(`${this.serverUrl}${endpoint}`, data, {
      headers: this.headers
    });
  }

  get(endpoint): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.get(`${this.serverUrl}${endpoint}`, {
      headers: this.headers
    });
  }
}
