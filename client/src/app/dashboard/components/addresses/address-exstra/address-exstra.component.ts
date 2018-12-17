import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { DashboardAddressesComponent } from '../addresses.component';

@Component({
  selector: 'avs-dashboard-address-exstra',
  templateUrl: './address-exstra.component.html',
  styleUrls: ['./address-exstra.component.scss']
})
export class DashboardAddressesExstraComponent implements OnInit {
  public addressForm: FormGroup;
  @Input() address: any;
  @Input() clientId: string;
  @Output() selectedAddress: EventEmitter<string>;

  constructor(private fb: FormBuilder,
    private parent: DashboardAddressesComponent,
    private addressService: AddressService) {
  }

  ngOnInit() {
    this.setAddressForm();
    this.selectedAddress = new EventEmitter<string>();
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
    if (this.addressForm.valid && this.clientId) {
      const addresInfo = this.addressForm.value;
      addresInfo.clientId = this.clientId;
      addresInfo.addressId = this.address.addressId;
      this.addressService.update(addresInfo).subscribe(() => {
           this.parent.getAllAddressesByClientId(this.clientId);
      });
    }
  }

  deleteAddress(addressId) {
    this.addressService.delete(addressId).subscribe(addresses => {
      this.parent.getAllAddressesByClientId(this.clientId);
    });
  }

  setAddressId(event, addressId) {
    event.stopPropagation();
    console.log('address Id', addressId);
    this.selectedAddress.emit(addressId);
  }
}
