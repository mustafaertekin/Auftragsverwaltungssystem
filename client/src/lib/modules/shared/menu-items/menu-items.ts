import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
}

const MENUITEMS = [{
    state: 'orders',
    name: 'Orders',
    icon: 'content_paste'
  },
  {
    state: 'customers',
    name: 'Customers',
    icon: 'supervisor_account'
  },
  {
    state: 'brands',
    name: 'Brands',
    icon: 'phone_iphone'
  },
  {
    state: 'services',
    name: 'Services',
    icon: 'build'
  },
  {
    state: 'users',
    name: 'Users',
    icon: 'perm_contact_calendar'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
