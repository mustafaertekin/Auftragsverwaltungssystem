import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { DashboardAddressesComponent } from '../addresses.component';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';

@Component({
  selector: 'avs-dashboard-address-extra',
  templateUrl: './address-extra.component.html',
  styleUrls: ['./address-extra.component.scss']
})
export class DashboardAddressesExtraComponent implements OnInit {
  public addressForm: FormGroup;
  @Input() address: any;
  @Input() clientId: string;
  @Input() userId: string;

  constructor(private fb: FormBuilder,
    private notificationService: NotificationService,
    private parent: DashboardAddressesComponent,
    private addressService: AddressService) {
  }

  ngOnInit() {
    this.setAddressForm();
  }

  setAddressForm() {
    this.addressForm = this.fb.group({
      streetName: [this.address.streetName, [Validators.required]],
      plzNumber: [this.address.plzNumber, [Validators.required]],
      cityName: [this.address.cityName, [Validators.required]],
      countryName: [this.address.countryName, [Validators.required]],
    });
  }

  updateAddress() {
    if (this.clientId) {
      this.updateForClient();
    }
    if (this.userId) {
      this.updateForUser();
    }
  }

  updateForClient() {
    if (this.addressForm.valid && this.clientId) {
      const addresInfo = this.addressForm.value;
      addresInfo.clientId = this.clientId;
      addresInfo.addressId = this.address.addressId;
      this.addressService.update(addresInfo).subscribe(() => {
        this.parent.getAllAddressesByClientId(this.clientId);
        this.notificationService.success('Successfully updated!');
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
      });
    }
  }

  updateForUser() {
    if (this.addressForm.valid && this.userId) {
      const addresInfo = this.addressForm.value;
      addresInfo.userId = this.userId;
      addresInfo.addressId = this.address.addressId;
      this.addressService.update(addresInfo).subscribe(() => {
        this.parent.getAllAddressesByClientId(this.userId);
        this.notificationService.success('Successfully updated!');
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
      });
    }
  }

  deleteAddress(addressId) {
    this.addressService.delete(addressId).subscribe(addresses => {
      this.parent.getAllAddressesByClientId(this.clientId || this.userId);
      this.notificationService.success('Successfully deleted!');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }
}
