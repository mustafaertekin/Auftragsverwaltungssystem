import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@avs-ecosystem/services/statistics.service';
import { UserService } from '@avs-ecosystem/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'avs-dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class DashboardMainLayoutComponent implements OnInit {
  data: any;
  constructor(private translate: TranslateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private settingService:  AppSettingsService,
    private statisticService: StatisticsService) {

  }

  ngOnInit() {
    this.translate.setDefaultLang('en-EN');
  }
}
