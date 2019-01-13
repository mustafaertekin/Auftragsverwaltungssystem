import { Component, OnInit, AfterContentInit, OnChanges} from '@angular/core';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avs-dashboard-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class DashboardOrdersComponent implements OnInit, OnChanges {
  orders: any;
  currentOrderId: any;
  animationState: string;
  opened = true;
  over = 'side';
  watcher: Subscription;

  constructor(private orderService: OrderService, media: ObservableMedia,
    private route: ActivatedRoute, private router: Router) {
      this.watcher = media.subscribe((change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.opened = false;
          this.over = 'over';
        } else {
          this.opened = true;
          this.over = 'side';
        }
      });
    }

  ngOnInit() {
    this.currentOrderId = null;
    this.animationState = 'out';
    this.route.params.subscribe(params => {
      this.currentOrderId = params['id'];
      if (this.currentOrderId === 'list') {
        this.currentOrderId = null;
      }
      this.getAllOrders(null);
    });
  }

  ngOnChanges() {
  }

  getAllOrders(event) {
    if (_.includes(['update'], event)) {
      console.log('burdan geldim', event);
      this.animationState = 'out';
      this.orders = [];
    }
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
      this.animationState = 'in';
      this.currentOrderId = this.currentOrderId || (orders[0] ? orders[0].orderId : null);
    });
  }

  searchWord(word) {
    this.animationState = 'out';
    if (!word) {
      this.animationState = 'in';
      return this.getAllOrders(null);
    }
    this.orderService.getByText(word).subscribe(orders => {
      this.orders = orders;
      this.animationState = 'in';
      this.currentOrderId = orders[0] ? orders[0].orderId : null;
    });
  }
}
