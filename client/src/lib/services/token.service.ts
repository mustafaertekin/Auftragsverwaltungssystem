import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class TokenService {

  constructor() { }

  public static getToken() {
    const token = localStorage.getItem('TOKEN');
    if(token) {
      return  JSON.parse(token);
    }
    return { access_token: '', token_type: ''};
  }

  setToken(token) {
    localStorage.setItem('TOKEN', JSON.stringify(token));
  }

  getToken(): any {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      return  JSON.parse(token);
    }
    return { access_token: '', token_type: ''};
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
