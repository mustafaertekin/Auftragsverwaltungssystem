import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { AddressService } from '@avs-ecosystem/services/address.service';

@Component({
  selector: 'avs-dashboard-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class DashboardAddressesComponent implements OnInit, OnChanges {
  public addressForm: FormGroup;
  public addresses: any[];
  public selectedAddress: any;
  @Input() clientId: string;
  @Input() userId: string;


  constructor(private fb: FormBuilder,
    private addressService: AddressService) {
  }

  ngOnInit() {
    this.setAddressForm();
  }

  ngOnChanges(changes) {
    if (this.clientId) {
      this.loadForClient(changes);
    }
    if (this.userId) {
      this.loadForUser(changes);
    }
  }

  loadForClient(changes) {
    if (changes.clientId.currentValue) {
      this.clientId = changes.clientId.currentValue;
      this.getAllAddressesByClientId(this.clientId);
    } else {
      this.addresses = null;
    }
  }

  loadForUser(changes) {
    if (changes.userId.currentValue) {
      this.userId = changes.userId.currentValue;
      this.getAllAddressesByClientId(this.userId);
    } else {
      this.addresses = null;
    }
  }

  setAddressForm() {
    this.addressForm = this.fb.group({
      streetName: ["", [Validators.required]],
      plzNumber: ["", [Validators.required]],
      cityName: ["", [Validators.required]],
      countryName: ["", [Validators.required]],
    });
  }

  saveAddress() {
    if (this.clientId) {
      this.saveForClient();
    }
    if (this.userId) {
      this.saveForUser();
    }
  }

  saveForClient() {
    if (this.addressForm.valid && this.clientId) {
      const addresInfo = this.addressForm.value;
      addresInfo.clientId = this.clientId;
      this.addressService.create(addresInfo).subscribe(() => {
          this.getAllAddressesByClientId(this.clientId);
      });
    }
  }

  saveForUser() {
    if (this.addressForm.valid && this.userId) {
      const addresInfo = this.addressForm.value;
      addresInfo.userId = this.userId;
      this.addressService.create(addresInfo).subscribe(() => {
          this.getAllAddressesByClientId(this.userId);
      });
    }
  }

  public getAllAddressesByClientId (clientId) {
    this.addressService.getByClientId(clientId).subscribe(addresses => {
      this.addresses = addresses;
    });
  }
}
