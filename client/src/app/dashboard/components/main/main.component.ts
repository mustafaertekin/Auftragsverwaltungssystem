import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@avs-ecosystem/services/statistics.service';
import { UserService } from '@avs-ecosystem/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';

@Component({
  selector: 'avs-dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  monathlyGainData: number [];

  constructor(private translate: TranslateService, private userService: UserService,
    private settingService:  AppSettingsService,
    private statisticService: StatisticsService) {
  }

  ngOnInit() {
    this.statisticService.getMonatlyGain().subscribe(data => {
      this.monathlyGainData = [data];
    });
  }
}
