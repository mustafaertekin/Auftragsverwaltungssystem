import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'avs-dashboard-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class DashboardMainContentComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;
  watcher: Subscription;
  opened = true;
  over = 'side';
  animationState: string;
  previousUrl: string;

  constructor(
    media: ObservableMedia, private router: Router) {
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
    this.animate();
    this.previousUrl  = this.router.url.split('/')[2];
    this.router.events.subscribe(elm => {
      const subRouter = this.router.url.split('/')[2];
      if (subRouter !== this.previousUrl) {
        this.animate();
        this.previousUrl = subRouter;
      }
    });
  }

  animate() {
    this.animationState = 'out';
    setTimeout(() => this.animationState = 'in', 400);
  }
}
