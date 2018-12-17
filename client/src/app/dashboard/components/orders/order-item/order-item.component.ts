import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'avs-dashboard-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class DashboardOrderItemComponent implements OnInit {
  @Input() order;

  constructor() {}

  ngOnInit() {
  }
}
