import { Component, OnInit, EventEmitter, ViewChild, ElementRef, OnChanges, Output } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';



@Component({
  selector: 'avs-sidenav',
  templateUrl: './avs-sidenav.component.html',
  styleUrls: ['./avs-sidenav.component.scss']
})
export class DashboardSideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;
  @Output() public emitter: EventEmitter<any> = new EventEmitter<any>();
  orders: any;
  currentOrderId: any;
  animationState: string;
  opened = true;
  over = 'side';
  watcher: Subscription;
  isMobile: boolean;

  constructor(private orderService: OrderService,
    private notificationService: NotificationService,
    private media: ObservableMedia,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.watcher = this.media.subscribe((change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.opened = false;
          this.over = 'over';
          this.isMobile = true;
        } else {
          this.opened = true;
          this.over = 'side';
          this.isMobile = false;
        }
        this.emitter.emit({isMobile: this.isMobile, isopen: this.opened});
      });
    }, 0);
  }
}
