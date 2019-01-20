import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import { Client } from '@avs-ecosystem/models/Client';
import * as _ from 'lodash';
import {startWith, map} from 'rxjs/operators';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { DashboardNewOrderComponent } from '../../orders/new-order/new-order.component';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';

@Component({
  selector: 'avs-dashboard-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class DashboardCustomerDetailsComponent implements OnInit, OnChanges {
  public customerForm: FormGroup;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() clientId: any;
  public addresses: any;
  myControl = new FormControl();
  options: Client[] = [];
  filteredOptions: Observable<Client[]>;


  constructor(private fb: FormBuilder, private notificationService: NotificationService, private addressService: AddressService,
    private clientService: ClientService,
    private settingService:  AppSettingsService) {
    this.setCustomerForm();
  }

  ngOnInit() {}

  ngOnChanges(changes) {
    if (!changes.clientId.currentValue && !changes.clientId.firstChange) {
      this.customerForm.reset();
      return this.clientId = null;
    }
    this.clientService.getById(this.clientId).subscribe(client => {
      this.setFormFields(client);
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

  displayFn(user?: string): string | undefined {
    return user ? user : undefined;
  }


  public getAllClients() {
    return this.clientService.getAll();
  }

  setCustomerForm() {
    this.customerForm = this.fb.group({
      salutation: [''],
      isActive: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public submitClientForm() {
      this.updateClient();
  }

  private updateClient() {
    if (this.customerForm.valid) {
      this.clientService.updateClient(this.clientId, this.customerForm.value)
        .subscribe(result => {
          this.emitter.emit(result);
        }, (err) => {
          this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
        });
    }
  }

  private createClient() {
    if (this.customerForm.valid) {
      this.clientService.createClient(this.customerForm.value)
        .subscribe(result => {
          this.emitter.emit(result);
        }, (err) => {
          this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
        });
    }
  }

  public deleteClient() {
    this.clientService.delete(this.clientId).subscribe(result => {
       this.emitter.emit(result.clientId);
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }


  setFormFields(result) {
    if (result) {
      this.customerForm.controls['salutation'].setValue(result.salutation);
      this.customerForm.controls['isActive'].setValue(result.isActive);
      this.customerForm.controls['email'].setValue(result.email);
      this.customerForm.controls['firstName'].setValue(result.firstName);
      this.customerForm.controls['lastName'].setValue(result.lastName);
      this.customerForm.controls['phone'].setValue(result.phone);
    }
  }
}
