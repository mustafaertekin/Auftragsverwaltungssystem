import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'avs-dashboard-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class DashboardOrderDetailsComponent implements OnInit {
   
  orderStatus: string;
  statuses: string[] = ['Pending', 'Processing', 'Completed', 'Unscuccesful', 'Delivered', 'Cancelled'];
  constructor() {}

  ngOnInit() {
     
  }
}
