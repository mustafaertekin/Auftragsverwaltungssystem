import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'orders',
    name: 'Orders',
    type: 'sub',
    icon: 'content_paste'
  },
  {
    state: 'customers',
    name: 'Customers',
    type: 'sub',
    icon: 'supervisor_account'
  },
  {
    state: 'brands',
    name: 'Brands',
    type: 'sub',
    icon: 'phone_iphone'
  },
  {
    state: 'services',
    name: 'Services',
    type: 'sub',
    icon: 'build'
  },
  {
    state: 'users',
    name: 'Users',
    type: 'sub',
    icon: 'perm_contact_calendar'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
