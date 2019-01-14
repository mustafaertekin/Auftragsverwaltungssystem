import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';

@Component({
  selector: 'avs-dashboard-side-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class DashboardSideMenuContentComponent implements OnInit {
  selectedMenu: string;
  currentUser: any;

  constructor(
    private settingService:  AppSettingsService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.selectedMenu = 'main';
    // on first load there is no event triggered
    this.route.params.subscribe(params => {
      this.setSelectedMenu();
    });
    // read url when routing is changed
    this.router.events.subscribe(params => {
      this.setSelectedMenu();
    });
    this.settingService.getCurentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  setSelectedMenu() {
    const urlparams = this.router.url.split('/');
    this.selectedMenu = urlparams[2];
  }

  isAdmin() {
    if (this.currentUser && this.currentUser.role) {
      return this.currentUser.role === 'admin';
    }
    return false;
  }
}
