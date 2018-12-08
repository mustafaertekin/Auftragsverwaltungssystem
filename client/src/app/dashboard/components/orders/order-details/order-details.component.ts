import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'avs-dashboard-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class DashboardOrderDetailsComponent implements OnInit {
   
  orderStatus: string;
  statuses: any[] = [
    { name: 'Pending', color: 'red'},
    { name: 'Processing', color: 'yellow'},
    { name: 'Completed', color: 'blue'},
    { name: 'Unscuccesful', color: 'green'},
    { name: 'Delivered', color: 'purple'},
    { name: 'Cancelled', color: 'orange'}
  ];
  constructor() {}

  ngOnInit() {
     
  }
}
