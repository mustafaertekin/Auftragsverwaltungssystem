import { Component, OnInit, Input, Inject, Output, EventEmitter, HostListener, AfterViewInit, AfterContentInit } from '@angular/core';
import { Observable, fromEvent, of, interval } from 'rxjs';
import { map, debounceTime, switchMap, tap } from 'rxjs/operators';
import * as Chart from 'chart.js';
import * as _ from 'lodash';
import { LineConfig } from './chart-config';

@Component({
  selector: 'avs-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class AvsLineChartComponent implements OnInit, AfterContentInit {
  @Output() word = new EventEmitter<string>();
  @Input() type: string;
  uniqueId: number;
  lineconfig: any;
  ctx: any;
  line_chart: any;
  line_chart_container: any;

  constructor() { }

  ngOnInit() {
    this.getUniqeId();
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
        this.lineconfig = new LineConfig(this.type);
        this.line_chart_container = document.getElementById('line_chart_container');
        this.line_chart = document.getElementById(`${this.uniqueId}`);

        this.lineconfig.addDataSet([], 'iphone iphonex glass');
        this.lineconfig.addDataSet([], 'huewai glass');
        this.lineconfig.addDataSet([], 'iphonex battary');

        myChart = new Chart(this.line_chart['getContext']('2d'), this.lineconfig.getConfig());
      }
      this.line_chart.style.width = `${size}px`;
      myChart.update(5000);
    }, 0);
  }
}
