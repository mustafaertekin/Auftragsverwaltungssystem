import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { UserService } from '@avs-ecosystem/services/user.service';

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
      });
    }
  }

  setUserForm(language = '', theme = '') {
    this.userSettings = this.fb.group({
      language: [language, [Validators.required]],
      theme: [theme, [Validators.required]]
    });
  }

}
