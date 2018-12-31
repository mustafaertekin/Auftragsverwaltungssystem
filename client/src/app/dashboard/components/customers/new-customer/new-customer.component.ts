import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import { Client } from '@avs-ecosystem/models/Client';
import * as _ from 'lodash';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { AddressService } from '@avs-ecosystem/services/address.service';


@Component({
  selector: 'avs-dashboard-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class DashboardNewCustomerComponent implements OnInit, OnChanges {
  public customerForm: FormGroup;
  isClientSubmitted: boolean;
  public client: any;

  constructor(private fb: FormBuilder, private addressService: AddressService,
    private clientService: ClientService) {
  }

  ngOnInit() {
    this.isClientSubmitted = false;
    this.setCustomerForm();
  }

  ngOnChanges() {
  }

  setCustomerForm() {
    this.customerForm = this.fb.group({
      salutation: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public submitClientForm() {
      this.saveClient();
  }

  private saveClient() {
    this.isClientSubmitted = false;
    if (this.customerForm.valid) {
      this.clientService.createClient(this.customerForm.value)
        .subscribe(result => {
          this.client = result;
          this.isClientSubmitted = true;
        }, err => console.log('Err from client submit', err));
    }
  }
}
