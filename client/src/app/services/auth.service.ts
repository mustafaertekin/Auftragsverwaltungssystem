import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { Observable,} from 'rxjs';
import { TokenService } from './token.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appHttpService: AppHttpService, private tokenService: TokenService) { }

  login(email, password): Observable<Response> {
    const loginparams = {
      "username":email,
      "password": password,
      "grant_type": "password"
    }
    return this.appHttpService.post('oauth/token', loginparams)
    .pipe(map((token) => { 
      this.tokenService.setToken(token);
      return token;
    }))
  }
}
