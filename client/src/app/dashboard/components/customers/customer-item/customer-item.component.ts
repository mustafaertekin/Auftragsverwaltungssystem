import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'avs-dashboard-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class DashboardCustomerItemComponent implements OnInit, OnChanges {
  @Input() customer;
  @Input() currentId;
  isHighlighted: boolean;
  constructor() {}

  ngOnInit() {
    this.isHighlighted = this.currentId === this.customer.customerId;
  }

  ngOnChanges() {
    this.isHighlighted = this.currentId === this.customer.customerId;
  }
}
