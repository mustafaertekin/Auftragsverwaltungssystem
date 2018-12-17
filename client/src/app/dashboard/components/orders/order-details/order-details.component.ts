import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avs-dashboard-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class DashboardOrderDetailsComponent implements OnInit, OnChanges {

  @Input() currentOrderId;
  public currentOrder: any;

  public orderStatus: string;
  statuses: any[] = [
    { name: 'Pending', color: 'red'},
    { name: 'Processing', color: 'yellow'},
    { name: 'Completed', color: 'blue'},
    { name: 'Unscuccesful', color: 'green'},
    { name: 'Delivered', color: 'purple'},
    { name: 'Cancelled', color: 'orange'}
  ];
  constructor(private orderService: OrderService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  ngOnChanges (changes) {
    this.orderService.getById(this.currentOrderId).subscribe(order => {
      this.currentOrder = order;
    });
  }

  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId).subscribe(result => {
      this.router.navigate(['/', 'dashboard', 'orders'], { relativeTo: this.route});
    });
  }
}
