import { Component, OnInit } from '@angular/core';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avs-dashboard-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class DashboardOrdersComponent implements OnInit {
  orders: any;
  currentOrderId: any;
  constructor(private orderService: OrderService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
      this.route.params.subscribe(params => {
        this.currentOrderId = params['id'] || (orders[0] ? orders[0].orderId : null);
      });
    });
  }
}
