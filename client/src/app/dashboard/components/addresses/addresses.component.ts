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
  public addresses: any;
  @Input() clientId:string;


  constructor(private fb: FormBuilder,
    private addressService: AddressService,
    private clientService: ClientService) {
  }

  ngOnInit() {
    this.setAddressForm();
  }

  ngOnChanges(changes){ 
    if(changes.clientId.currentValue) {
      this.clientId = changes.clientId.currentValue;
      this.getAllAddressesByClientId(this.clientId);
    } else {
      this.addresses = null;
    } 
  }

  setAddressForm(){
    this.addressForm = this.fb.group({
      streetName: ["", [Validators.required]],
      plzNumber: ["", [Validators.required]],
      cityName: ["", [Validators.required]],
      countryName: ["", [Validators.required]],
    });
  }

  saveAddress(){
    if(this.addressForm.valid && this.clientId) {
      
      let addresInfo = this.addressForm.value;
      addresInfo.clientId = this.clientId;
      this.addressService.create(addresInfo).subscribe(() => {
          this.getAllAddressesByClientId(this.clientId);
      });
    }
  }

  public getAllAddressesByClientId (clientId) {
    this.addressService.getByClientId(clientId).subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  deleteAddress(addressId) {
    this.addressService.delete(addressId).subscribe(addresses => {
      this.getAllAddressesByClientId(this.clientId);
    })
  }
}
