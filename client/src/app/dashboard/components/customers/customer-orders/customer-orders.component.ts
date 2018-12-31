import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import { Client } from '@avs-ecosystem/models/Client';
import * as _ from 'lodash';
import { ClientService } from '@avs-ecosystem/services/client.service';


@Component({
  selector: 'avs-dashboard-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class DashboardCustomerOrdersComponent implements OnInit, OnChanges {
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() clientId: string;
  orders: any [];


  constructor(private fb: FormBuilder,
    private clientService: ClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.clientService.getOrders(this.clientId).subscribe(orders => {
      this.orders = orders;
    });
  }
}
