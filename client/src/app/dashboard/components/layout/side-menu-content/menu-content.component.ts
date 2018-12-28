import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'avs-dashboard-side-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class DashboardSideMenuContentComponent implements OnInit {
  selectedMenu: string;

  constructor(
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.selectedMenu = 'main';
    this.router.events.subscribe(params => {
      const urlparams = this.router.url.split('/');
      this.selectedMenu = urlparams[2];
    });
  }
}
