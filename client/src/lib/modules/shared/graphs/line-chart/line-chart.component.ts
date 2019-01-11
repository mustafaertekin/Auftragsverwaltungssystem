import { Component, OnInit, Input, Inject, Output, EventEmitter, HostListener, AfterViewInit, AfterContentInit } from '@angular/core';
import { Observable, fromEvent, of, interval } from 'rxjs';
import { map, debounceTime, switchMap, tap } from 'rxjs/operators';
import * as Chart from 'chart.js';
import * as _ from 'lodash';
import { LineConfig } from './chart-config';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs/operators';

@Component({
  selector: 'avs-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class AvsLineChartComponent implements OnInit, AfterContentInit {
  @Output() word = new EventEmitter<string>();
  @Input() type: string;
  @Input() title: string;
  @Input() data: number[];
  uniqueId: number;
  lineconfig: any;
  ctx: any;
  line_chart: any;
  line_chart_container: any;
  months: string []  = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.getUniqeId();
    this.updateMonthsNames();
    this.translate.onLangChange.subscribe(() =>   {
      this.updateMonthsNames();
    });
    // console.log('MONTHS', this.months);
  }

  updateMonthsNames() {
    this.months = [];
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

  ngAfterContentInit() {
    this.line_chart_container = document.getElementById('line_chart_container');
    this.setNewSize(this.line_chart_container.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.line_chart_container = document.getElementById('line_chart_container');
    this.setNewSize(this.line_chart_container.innerWidth);
  }

  getUniqeId () {
    this.uniqueId = Date.now() - Math.floor(Math.random() * 1000);
  }

  setNewSize(size) {
    let myChart = null;
    setTimeout(() => {
      if (!this.lineconfig) {
        this.lineconfig = new LineConfig(this.type, this.title);
        this.lineconfig.getConfig().data.labels = this.months;
        this.line_chart_container = document.getElementById('line_chart_container');
        this.line_chart = document.getElementById(`${this.uniqueId}`);
        if (!this.data) {
          this.lineconfig.addDataSet([], this.title);
        } else {
          this.data.forEach(item => {
            this.lineconfig.addDataSet(item, this.title);
          });
        }

        myChart = new Chart(this.line_chart['getContext']('2d'), this.lineconfig.getConfig());
      }
      this.line_chart.style.width = `${size}px`;

      if (myChart) {
        myChart.update(100);
      }
    }, 200);
  }
}
