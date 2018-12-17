import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avs-dashboard-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class DashboardNewOrderComponent implements OnInit {
  optional: boolean;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) {}

  ngOnInit() {
    this.optional = false;
  }

  saveOrder(services, client, address) {
    const addedServices = services.map(item => {
      return {
        deviceId: item.device.deviceId,
        deviceModelId: item.model.deviceModelId,
        serviceId: item.service.serviceId
      };
    });
    if (addedServices.length && client.clientId && address.addressId) {
      this.orderService.createOrder(
        {
          addedServices,
          clientId: client.clientId,
          addressId: address.addressId
        }).subscribe(result =>  {
            this.router.navigate(['/', 'dashboard', 'orders', `${result.orderId}`], { relativeTo: this.route});
        });
    }
  }
}
