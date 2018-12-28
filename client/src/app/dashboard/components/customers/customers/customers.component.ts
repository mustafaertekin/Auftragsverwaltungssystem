import { Component, OnInit } from '@angular/core';
import { ClientService } from '@avs-ecosystem/services/client.service';

@Component({
  selector: 'avs-dashboard-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class DashboardCustomersComponent implements OnInit {
  customers: any;
  currentCustomerId: string;
  animationState: string;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.animationState = 'out';
    this.clientService.getAll().subscribe(customers => {
      this.customers = customers;
      this.currentCustomerId = this.customers[0] ? this.customers[0] : null;
    });
  }

  searchWord(word) {
    console.log(word);
  }

}
