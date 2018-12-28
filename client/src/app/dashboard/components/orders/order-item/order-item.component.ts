import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'avs-dashboard-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class DashboardOrderItemComponent implements OnInit, OnChanges {
  @Input() order;
  @Input() currentId;
  isHighlighted: boolean;
  constructor() {}

  ngOnInit() {
    this.isHighlighted = this.currentId === this.order.orderId;
  }

  ngOnChanges() {
    this.isHighlighted = this.currentId === this.order.orderId;
  }
}
