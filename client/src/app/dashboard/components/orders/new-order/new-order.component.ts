import {Component, OnInit, AfterContentInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject, fromEvent} from 'rxjs';
import {map, debounceTime} from 'rxjs/operators';
import * as _ from 'lodash';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avs-dashboard-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class DashboardNewOrderComponent implements OnInit, AfterContentInit {
  optional: boolean;
  customers: any[];
  customer: any;
  addressForms: FormGroup;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private orderService: OrderService) {}

  ngOnInit() {
    this.optional = false;
    this.setAddressForm();
  }

  saveOrder(services) {
    const addedServices = services.map(item => {
      return {
        deviceId: item.device.deviceId,
        deviceModelId: item.model.deviceModelId,
        serviceId: item.service.serviceId
      };
    });
    if (addedServices.length && this.customer.clientId && this.addressForms.valid) {
      this.orderService.createOrder(
        {
          addedServices,
          clientId: this.customer.clientId,
          deliveryAddress: this.addressForms.value.deliveryAddress,
          invoiceAddress: this.addressForms.value.invoiceAddress
        }).subscribe(result =>  {
            this.router.navigate(['/', 'dashboard', 'orders', `${result.orderId}`], { relativeTo: this.route});
        });
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      const input = document.getElementById('customer_search');
      const input$ = fromEvent(input, 'keyup')
        .pipe(
          map(x => _.get(x, 'currentTarget.value')),
          debounceTime(500)
        );
      if (input$) {
        input$.subscribe(x => this.search(x));
      }
    }, 0);
  }

  search(word) {
    if (!word) {
      this.customers = [];
      this.customer = null;
      return;
    }
    this.clientService.getByText(word).subscribe(customers => {
      this.customers = customers;
    });
  }

  getName(customer) {
    return `${customer.firstName} ${customer.lastName}`;
  }

  setCustomer(customer) {
    this.customer = customer;
  }

  setAddressForm() {
    this.addressForms = this.fb.group({
      deliveryAddress: ['', [Validators.required]],
      invoiceAddress: ['', [Validators.required]],
    });
  }
}
