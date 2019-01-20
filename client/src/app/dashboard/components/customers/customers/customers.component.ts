import { Component, OnInit, OnChanges } from '@angular/core';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import * as _ from 'lodash';

@Component({
  selector: 'avs-dashboard-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class DashboardCustomersComponent implements OnInit {
  customers: any;
  currentCustomerId: string;
  animationState: string;
  isMobile: boolean;
  opened: boolean;

  constructor(private clientService: ClientService, private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isMobile = false;
    this.opened = true;
    this.currentCustomerId = null;
    this.animationState = 'out';
    this.route.params.subscribe(params => {
      this.currentCustomerId = params['id'];
      if (this.currentCustomerId === 'list') {
        this.currentCustomerId = null;
      }
    });
    this.getAll(null);
  }

  getAll(event) {
    this.clientService.getAll().subscribe(customers => {
      this.customers = customers;
      this.currentCustomerId = this.currentCustomerId || (this.customers[0] ? this.customers[0].clientId : null);
      this.animationState = 'in';
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
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

  navigateToUrl(client) {
    this.currentCustomerId = client.clientId;
    this.router.navigate(['/', 'dashboard', 'customers', client.clientId]);
  }

  getCurrentClient(clientId) {
    if (this.customers) {
      return this.customers.find(item => item.clientId === clientId);
    }
  }

  searchWord(word) {
    this.animationState = 'out';
    if (!word) {
      return this.getAll(null);
    }
    this.clientService.getByText(word).subscribe(customers => {
      this.customers = customers;
      this.currentCustomerId = this.customers[0] ? this.customers[0].clientId : null;
      this.animationState = 'in';
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

}
