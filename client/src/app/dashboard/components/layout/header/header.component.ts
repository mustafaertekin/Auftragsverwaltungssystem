import { Component, OnInit, Input } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '@avs-ecosystem/services/token.service';

@Component({
  selector: 'avs-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DashboardMainHeaderComponent implements OnInit {
  @Input() toogleMenu;
  constructor(
    private tokenService: TokenService,
    private router: Router,
     ) {
   }

  ngOnInit() {
  }

  toogleSideNavigation() {
    this.toogleMenu.toggle();
  }

  logout() {
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }
}
