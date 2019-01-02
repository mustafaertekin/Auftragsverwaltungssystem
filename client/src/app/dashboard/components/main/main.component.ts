import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '@avs-ecosystem/services/statistics.service';

@Component({
  selector: 'avs-dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  monathlyGainData: number [];

  constructor(private statisticService: StatisticsService) {

  }
  ngOnInit() {
    this.statisticService.getMonatlyGain().subscribe(data => {
      this.monathlyGainData = [data];
    });
  }
}
