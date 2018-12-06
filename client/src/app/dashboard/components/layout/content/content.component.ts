import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'avs-dashboard-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class DashboardMainContentComponent implements OnInit {
  @ViewChild('sidenav') sidenav:ElementRef;
  watcher: Subscription;
  opened = true;
  over = 'side'; 

  constructor(
    media: ObservableMedia) {
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
     
  }
}
