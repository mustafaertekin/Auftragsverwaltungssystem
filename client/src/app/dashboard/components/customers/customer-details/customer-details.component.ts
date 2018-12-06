import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms'; 
import {Observable, BehaviorSubject} from 'rxjs'; 
import { Client } from '@avs-ecosystem/models/Client';
import * as _ from 'lodash'; 
import {startWith, map} from 'rxjs/operators';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { DashboardNewOrderComponent } from '../../orders/new-order/new-order.component';
 

@Component({
  selector: 'avs-dashboard-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class DashboardCustomerDetailsComponent implements OnInit {
  public customerForm: FormGroup;
  public addressForm: FormGroup;
  @Input() clientId: string; 
  public addresses: any;
  myControl = new FormControl();
  options: Client[] = [];
  filteredOptions: Observable<Client[]>;
  public client:Client; 


  constructor(private fb: FormBuilder,
    private parent: DashboardNewOrderComponent ,
    private addressService: AddressService,
    private clientService: ClientService) {

    this.setCustomerForm();
  }

  ngOnInit() {
    this.getAllClients().subscribe(result => { 
      this.options = result; 
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | Client>(''),
            map(value => typeof value === 'string' ? value : value.firstName),
            map(name => {
              if(!name) {
                this.showPersonDetails(null);
              }
              return name ? this._filter(name) : this.options.slice();
            }) 
        ); 
    }) 
  }
 
  displayFn(user?: string): string | undefined {
    return user ? user : undefined;
  }

  private _filter(word: string): Client[] {
    
    const clients = this.options.filter(client => {
      let value = [
        client.firstName.toLowerCase(), 
        client.lastName.toLowerCase(), 
        client.email.toLowerCase(), 
        client.phone.toLowerCase()
      ]
      return _.includes(value.join("").toLowerCase(),  word.toLowerCase())
    });
    
    if(!clients.length){ 
      this.showPersonDetails(null);
    }
    return clients;
  }

  public getFullName(person) {
    return `${person.firstName} ${person.lastName}`
  }
  

  public getAllClients() {
    return this.clientService.getAll();
  }

  public showPersonDetails(client) {
     this.client = client;
     let holder = null;
     if(!this.client){
      holder = { salutation: '', email: '', firstName: '', lastName: '', phone: ''};
     } 
     this.setFormFields(this.client || holder);
  } 

  setCustomerForm(){
    this.customerForm = this.fb.group({
      salutation: [""],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  public submitClientForm() {
    if (this.client && this.client.clientId) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  private createClient() {
    if (this.customerForm.valid) {
      this.clientService.createClient(this.customerForm.value)
        .subscribe((client) => {
          this.client = client; 
          this.getAllClients().subscribe(result => { 
            this.options = result; 
          });
        }
          , err => console.log('Err from client submit', err));
    }
  }

  private updateClient() {
    if (this.customerForm.valid) {
      this.clientService.updateClient(this.client.clientId, this.customerForm.value)
        .subscribe(result => { 
          this.client = result;
          this.getAllClients().subscribe(result => { 
            this.options = result; 
          });
          
        }, err => console.log('Err from client submit', err));
    }
  }
 

  setFormFields(result) {
    this.customerForm.controls['salutation'].setValue(result.salutation);
    this.customerForm.controls['email'].setValue(result.email);
    this.customerForm.controls['firstName'].setValue(result.firstName);
    this.customerForm.controls['lastName'].setValue(result.lastName);
    this.customerForm.controls['phone'].setValue(result.phone);
  } 
}
