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
export class UserService {
  private serverUrl: string;
  constructor(private  http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = environment.baseUrl;
   }

  public createUser(user): Observable<any> {
    return this.http.post(`${this.serverUrl}users`, user).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}users`).pipe(map((res: Response) => res));
  }

  public getById(userId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}users/${userId}`).pipe(map((res: Response) => res));
  }

  public current(): Observable<any> {
    return this.http.get(`${this.serverUrl}users/current`).pipe(map((res: Response) => res));
  }

  public updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.serverUrl}users/${userId}`, user).pipe(map((res: Response) => res));
  }

  public delete(userId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}users/${userId}`).pipe(map((res: Response) => res));
  }

  public getUsers(userId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}users/orders/${userId}`).pipe(map((res: Response) => res));
  }

  public getByText(text: string): Observable<any> {
    return this.http.get(`${this.serverUrl}users/search/${text}`).pipe(map((res: Response) => res));
  }

  public updatePassword(userId: string, passform: any): Observable<any> {
    return this.http.put(`${this.serverUrl}users/${userId}/password`, passform).pipe(map((res: Response) => res));
  }
}
