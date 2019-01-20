import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@avs-ecosystem/services/statistics.service';
import { UserService } from '@avs-ecosystem/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { merge } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'avs-dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  monathlyGainData: number [];
  months: any [] = [];
  statuses: any [] = [];
  stateData: number [];
  servicesNames: string [];
  servicesValues: number [];
  isLoaded: boolean;

  constructor(private translate: TranslateService, private userService: UserService,
    private settingService:  AppSettingsService,
    private statisticService: StatisticsService) {
  }

  ngOnInit() {
    this.translateMonths();
    this.isLoaded = false;
    this.statisticService.getStatistcis().subscribe(data => {
      this.monathlyGainData = [data.gain];
      this.stateData = data.statuses.map(item => item.cnt);
      this.statuses = data.statuses.map(item => item.status);
      this.servicesNames = data.services.names;
      this.servicesValues = data.services.values;
      this.isLoaded = true;
    });
  }

  translateMonths () {
    const MONTHS = [
      this.translate.get('MONTHS.JANUARY'),
      this.translate.get('MONTHS.FEBRUARY'),
      this.translate.get('MONTHS.MARCH'),
      this.translate.get('MONTHS.APRIL'),
      this.translate.get('MONTHS.MAY'),
      this.translate.get('MONTHS.JUNE'),
      this.translate.get('MONTHS.JULY'),
      this.translate.get('MONTHS.AUGUST'),
      this.translate.get('MONTHS.SEPTEMBER'),
      this.translate.get('MONTHS.OCTOBER'),
      this.translate.get('MONTHS.NOVEMBER'),
      this.translate.get('MONTHS.DECEMBER'),
    ];
    of(null).pipe(merge(...MONTHS)).subscribe((result: string) => {
      if (result) {
        this.months.push(result);
      }
    });
  }
 }

