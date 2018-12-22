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
    { name: 'Pending', color: 'pending'},
    { name: 'Processing', color: 'processing'},
    { name: 'Completed', color: 'completed'},
    { name: 'Unscuccesful', color: 'unscuccesful'},
    { name: 'Delivered', color: 'delivered'},
    { name: 'Cancelled', color: 'cancelled'}
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
