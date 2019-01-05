import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Resolve } from '@angular/router';
import { UserService } from './user.service';
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class CurrentUserResolver implements Resolve<any> {
  constructor(private userService: UserService, private settingService: AppSettingsService) {}

  resolve() {
    return this.userService.current()
    .subscribe(user => {
      this.settingService.setUser(user);
      if (user) {
        this.settingService.setUser(user);
        if (user.setting) {
          this.settingService.setLanguage(user.setting.language);
          this.settingService.setThema(user.setting.theme);
        }
      }
    });
  }
}
