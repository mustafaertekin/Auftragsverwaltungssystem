import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '@avs-ecosystem/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  changeThema;
  currentUser: any;
  private serverUrl: string;
  constructor(private  http: HttpClient, private userService: UserService, private translate: TranslateService) {
    this.serverUrl = environment.baseUrl;
    this.changeThema = new BehaviorSubject('green-theme');
    this.currentUser = new BehaviorSubject(null);
   }

  getCurentUser() {
    return this.currentUser;
  }

  setThema(theme) {
    this.changeThema.next(theme);
  }

  listenThemaChanges() {
    return this.changeThema;
  }

  setUser(user) {
    this.currentUser.next(user);
  }

  setLanguage(language) {
    this.translate.use(language);
  }

  public updateOrCreate(data): Observable<any> {
    return this.http.post(`${this.serverUrl}settings`, data).pipe(map((res: Response) => res));
  }
}
