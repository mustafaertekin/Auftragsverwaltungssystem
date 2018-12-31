import { Component, OnInit, AfterContentInit, OnChanges} from '@angular/core';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avs-dashboard-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class DashboardOrdersComponent implements OnInit, OnChanges {
  orders: any;
  currentOrderId: any;
  animationState: string;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.animationState = 'out';
    this.getAllOrders();
    this.route.params.subscribe(params => {
      this.currentOrderId = params['id'];
      if (this.currentOrderId === 'list') {
        this.currentOrderId = null;
        this.animationState = 'out';
        this.getAllOrders();
      }
    });
  }

  ngOnChanges() {
  }

  getAllOrders() {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
      this.animationState = 'in';
      this.currentOrderId = this.currentOrderId || (orders[0] ? orders[0].orderId : null);
    });
  }

  searchWord(word) {
    this.animationState = 'out';
    if (!word) {
      return this.getAllOrders();
    }
    this.orderService.getByText(word).subscribe(orders => {
      this.orders = orders;
      this.animationState = 'in';
      this.currentOrderId = orders[0] ? orders[0].orderId : null;
    });
  }
}
