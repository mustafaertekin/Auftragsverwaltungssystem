import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { UserService } from '@avs-ecosystem/services/user.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import * as _ from 'lodash';

@Component({
  selector: 'avs-dashboard-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class DashboardSettingsComponent implements OnInit {
  currentTheme: string;
  userSettings: FormGroup;
  user: any;
  themes: string[] = [
    'light-theme',
    'dark-theme',
    'green-theme',
    'red-theme',
    'blue-theme',
    'orange-theme',
    'purple-theme'
  ];

  constructor(private settingService: AppSettingsService,
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.setUserForm();
    this.settingService.getCurentUser().subscribe(user => {
      this.user = user;
      if (user && user.setting) {
        this.setUserForm(user.setting.language, user.setting.theme);
      }
    });
  }

  changeLanguage(language) {
    this.settingService.setLanguage(language);
  }

  changeTheme(theme) {
    this.settingService.setThema(theme);
  }


  submitSettings() {
    const data = this.userSettings.value;
    data.userId = this.user.userId;
    if (this.user && this.user.setting) {
      data.settingId = this.user.setting.settingId;
    }
    if (this.userSettings.valid) {
      this.settingService.updateOrCreate(data).subscribe(user => {
        this.settingService.setUser(user);
        this.notificationService.success('Settings are updated');
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
      });
    } else {
      this.notificationService.error('Form is not valid!');
    }
  }

  setUserForm(language = '', theme = '') {
    this.userSettings = this.fb.group({
      language: [language, [Validators.required]],
      theme: [theme, [Validators.required]]
    });
  }

}
