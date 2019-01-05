import { Component, OnInit, Input } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '@avs-ecosystem/services/token.service';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import * as _ from 'lodash';

@Component({
  selector: 'avs-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DashboardMainHeaderComponent implements OnInit {
  @Input() toogleMenu;
  personName:  string;
  constructor(
    private settingService: AppSettingsService,
    private tokenService: TokenService,
    private router: Router,
     ) {
   }

  ngOnInit() {
    this.settingService.getCurentUser().subscribe(user => {
      if (user) {
        this.setPersonName(user);
      }
    });
  }

  setPersonName (user) {
    const nameInitial = _.get(user.firstName, '[0]', '');
    // const lastnameInitial = _.get(user.firstName, '[0]', '');
    this.personName = `${nameInitial.toUpperCase()}`;
  }

  toogleSideNavigation() {
    this.toogleMenu.toggle();
  }

  logout() {
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }
}
