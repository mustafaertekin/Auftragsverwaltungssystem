import { Injectable } from '@angular/core';
import { AppHttpService } from '@avs-ecosystem/services/app-http.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { map, catchError } from 'rxjs/operators';
import { NotificationService } from './notification-sevice';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appHttpService: AppHttpService,
    private notificationService: NotificationService,
    private tokenService: TokenService) { }

  login(email, password): Observable<Response> {
    const loginparams = {
      'username': email,
      'password': password,
      'grant_type': 'password'
    };
    return this.appHttpService.post('oauth/token', loginparams)
      .pipe(
        map((token) => {
          this.tokenService.setToken(token);
          return token;
        }),
        catchError((err) => {
          this.notificationService.error('Please check your credentials and try again!');
          return of(err);
        })
      );
  }
}
