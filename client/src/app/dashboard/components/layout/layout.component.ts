import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@avs-ecosystem/services/statistics.service';
import { UserService } from '@avs-ecosystem/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';

@Component({
  selector: 'avs-dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class DashboardMainLayoutComponent implements OnInit {

  constructor(private translate: TranslateService, private userService: UserService,
    private settingService:  AppSettingsService,
    private statisticService: StatisticsService) {

  }

  ngOnInit() {
    this.translate.setDefaultLang('en-EN');
    this.userService.current().subscribe(user => {
      if (user && user.setting) {
        this.settingService.setLanguage(user.setting.language);
        this.settingService.setThema(user.setting.theme);
      }
    });
  }
}
