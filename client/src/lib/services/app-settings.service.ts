import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  changeThema;
  constructor( ) {
    this.changeThema = new BehaviorSubject('light-theme');
  }

  setThema(theme) {
    this.changeThema.next(theme);
  }

  listenThemaChanges() {
    return this.changeThema;
  }
}
