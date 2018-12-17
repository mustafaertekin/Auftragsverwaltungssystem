import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';

@Component({
  selector: 'avs-dashboard-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class DashboardSettingsComponent implements OnInit {
  currentTheme: string;
  themes: string[] = ['light-theme', 'dark-theme'];

  constructor(private settingService: AppSettingsService) { }

  ngOnInit() {
    this.settingService.listenThemaChanges().subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  changeTheme(theme) {
    this.settingService.setThema(theme);
  }
}
