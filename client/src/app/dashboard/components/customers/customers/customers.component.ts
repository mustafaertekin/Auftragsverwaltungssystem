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

  constructor(private clientService: ClientService, private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
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
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
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
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

}
