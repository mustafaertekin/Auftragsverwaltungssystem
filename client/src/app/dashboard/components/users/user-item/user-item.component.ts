import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'avs-dashboard-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class DashboardUserItemComponent implements OnInit, OnChanges {
  @Input() user;
  @Input() userId;
  isHighlighted: boolean;
  constructor() { }

  ngOnInit() {
    this.isHighlighted = this.userId === this.user.userId;
  }

  ngOnChanges() {
    this.isHighlighted = this.userId === this.user.userId;
  }
}
