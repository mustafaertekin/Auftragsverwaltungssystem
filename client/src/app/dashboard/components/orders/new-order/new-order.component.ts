import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';

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
  selectedDelivery: string;
  deliveryDate: FormControl;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.optional = false;
    this.deliveryDate = new FormControl(new Date());
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
          invoiceAddress: this.addressForms.value.invoiceAddress,
          deliveryDate: this.deliveryDate.value,
        }).subscribe(result => {
          this.router.navigate(['/', 'dashboard', 'orders', `${result.orderId}`], { relativeTo: this.route });
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
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  setAddressId(addressId) {
    this.addressForms.controls['deliveryAddress'].setValue(addressId);
    this.addressForms.controls['invoiceAddress'].setValue(addressId);
    return addressId;
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
