import { Component, OnInit } from '@angular/core';
export interface Customer {
  id: number;
  name: string;
  email: string;
  adresse: string;
  plz: number;
  ort: string;
}

const CUSTOMER_DATA: Customer[] = [
  {id: 1, name: 'Hans Peter', adresse: 'Astrasse 1', plz: 4600, ort: 'Zürich', email: 'hans322@gmail.com'},
  {id: 2, name: 'George Nicky', adresse: 'Bstrasse 2', plz: 3200, ort: 'Zürich', email: 'george999@hotmail.com'},
  {id: 3, name: 'William Mann', adresse: 'Cstrasse 3', plz: 9000, ort: 'Zürich', email: 'w.mann@gmx.ch'},
  {id: 4, name: 'Michael Waldorf', adresse: 'Rstrasse 3', plz: 5600, ort: 'Zürich', email: 'm.waldorf@gmail.com'},
  {id: 5, name: 'Ali Arkadas', adresse: 'Dstrasse 3', plz: 4300, ort: 'Zürich', email: 'a.arkadas@gmail.com'},
  {id: 6, name: 'Veli Meli', adresse: 'Ostrasse 4', plz: 4600, ort: 'Zürich', email: 'v.meli@gmail.com'},
  {id: 7, name: 'Hasan Isbilir', adresse: 'Pstrasse 3', plz: 8600, ort: 'Zürich', email: 'h.isbilir@gmail.com'},
  {id: 8, name: 'Nail Muteber', adresse: 'Kstrasse 6', plz: 8700, ort: 'Zürich', email: 'musn.muteberter@gmail.com'},
  {id: 9, name: 'Fatma Soylu', adresse: 'Cstrasse 7', plz: 4700, ort: 'Zürich', email: 'f.soylu@gmail.com'},
  {id: 10, name: 'Neon Meon', adresse: 'Ystrasse 8', plz: 5600, ort: 'Zürich', email: 'n.meon@gmail.com'},
];
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'adresse', 'plz', 'ort'];
  dataSource = CUSTOMER_DATA;

  constructor() { }

  ngOnInit() {
  }

}
