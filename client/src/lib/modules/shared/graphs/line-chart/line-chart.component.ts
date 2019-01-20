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
  @Input() xaxes: any [];
  uniqueId: number;
  lineconfig: any;
  ctx: any;
  line_chart: any;
  line_chart_container: any;
  myChart: any = null;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.getUniqeId();

    if (!this.type) {
      throw new Error('graph type must be defined');
    }
  }

  ngAfterContentInit() {
    this.line_chart_container = document.getElementById('line_chart_container');
    this.setNewSize(this.line_chart_container.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.line_chart_container = document.getElementById('line_chart_container');
    this.setNewSize(this.line_chart_container.innerWidth);
    if (this.myChart) {
      this.myChart.update(100);
    }
  }

  getUniqeId() {
    this.uniqueId = Date.now() - Math.floor(Math.random() * 1000);
  }

  setNewSize(size) {
    this.myChart = null;
    setTimeout(() => {
      if (!this.lineconfig) {
        if (this.type === 'line' || this.type === 'bar') {
          this.setLineChart(size);
        }
        if (this.type === 'pie') {
          this.setPieChart(size);
        }
      }
    }, 200);
  }

  setLineChart(size) {
    this.lineconfig = new LineConfig(this.type, this.title);
    this.lineconfig.getConfig().data.labels = this.xaxes;
    this.line_chart_container = document.getElementById('line_chart_container');
    this.line_chart = document.getElementById(`${this.uniqueId}`);
    if (!this.data) {
      this.lineconfig.addDataSet([], this.title);
    } else {
      this.data.forEach(item => {
        this.lineconfig.addDataSet(item, this.title);
      });
    }
    this.line_chart.style.width = `${size}px`;
    this.myChart = new Chart(this.line_chart['getContext']('2d'), this.lineconfig.getConfig());
  }

  setPieChart(size) {
    this.lineconfig = new LineConfig(this.type, this.title);
    this.lineconfig.getConfig().data.labels = this.xaxes;
    this.lineconfig.getConfig().options = {  responsive: true, title: { display: true,  text: this.title  }};

    this.line_chart_container = document.getElementById('line_chart_container');
    this.line_chart = document.getElementById(`${this.uniqueId}`);
    if (!this.data) {
      this.lineconfig.addDataSet([], this.title);
    } else {
      if (Array.isArray(this.data[0])) {
        this.data.forEach(item => {
          this.lineconfig.addDataSet(item, this.title);
        });
      } else {
        this.lineconfig.addDataSet(this.data, this.title);
      }
    }
    this.line_chart.style.width = `${size}px`;
    this.myChart = new Chart(this.line_chart['getContext']('2d'), this.lineconfig.getConfig());
  }
}
