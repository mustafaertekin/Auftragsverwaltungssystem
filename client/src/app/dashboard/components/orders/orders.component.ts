import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';


@Component({
  selector: 'avs-dashboard-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class DashboardOrdersComponent implements OnInit, OnChanges {
  @ViewChild('ordernav') ordernav: ElementRef;
  orders: any;
  currentOrderId: any;
  animationState: string;
  isMobile: boolean;
  opened: boolean;

  constructor(private orderService: OrderService,
    private notificationService: NotificationService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.isMobile = false;
    this.opened = true;
    this.currentOrderId = null;
    this.animationState = 'out';
    this.route.params.subscribe(params => {
      this.currentOrderId = params['id'];
      this.setInitialSettings();
    });
  }

  setInitialSettings() {
    if (this.currentOrderId === 'list') {
      this.currentOrderId = null;
    }
    this.getAllOrders(null);
  }

  ngOnChanges() {
  }

  changeNavigationState(event) {
    this.isMobile = event.isMobile;
    this.opened = event.opened;
  }

  closeOnMobileSelection(item, nav) {
    this.navigateToUrl(item);
    if (this.isMobile) {
      nav.sidenav.toggle();
    }
  }

  navigateToUrl(order) {
    this.currentOrderId = order.orderId;
    this.router.navigate(['/', 'dashboard', 'orders', order.orderId]);
  }

  getAllOrders(event) {
    if (_.includes(['update'], event)) {
    }
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
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
      if (!orders.length) {
        this.notificationService.warn('No result found!');
      }
      this.orders = orders;
      this.animationState = 'in';
      this.currentOrderId = orders[0] ? orders[0].orderId : null;
    });
  }

  toggleNavigation() {
    this.ordernav['sidenav'].toggle();
  }
}
