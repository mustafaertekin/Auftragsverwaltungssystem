import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as setup from '@avs-ecosystem/services/mockServices/test-setup';
import { By } from '@angular/platform-browser';

import { DashboardAddressesComponent } from './addresses.component';


describe('Address Exstra Component', () => {
  let component: DashboardAddressesComponent;
  let fixture: ComponentFixture<DashboardAddressesComponent>;
  let debugElement: DebugElement;
  let addressMockService = null;

  const ADDRESSES = [
    {
      streetName: 'street name',
      plzNumber: '1111',
      cityName: 'zurich',
      addressId: '111111-133-44444-5555',
      countryName: 'swiss',
      clientId: '111111-233-44444-5555',
      userId: '111111-333-44444-5555'
    }
  ];

  const instantiateMocks = () => {
    addressMockService = jasmine.createSpyObj(['delete', 'update', 'getByClientId', 'create']);
    addressMockService.update.and.returnValue(of(null));
    addressMockService.delete.and.returnValue(of(null));
    addressMockService.create.and.returnValue(of(ADDRESSES[0]));
    addressMockService.getByClientId.and.returnValue(of(ADDRESSES));
  };

  const spysOn = (service, method) => {
    service = debugElement.injector.get(service);
    return spyOn(service, method);
  };

  const setComponentInputs = (componentReference) => {
    componentReference.address = ADDRESSES[0];

    componentReference.clientId = ADDRESSES[0].clientId;
    componentReference.userId = ADDRESSES[0].userId;
  };

  const setForm = (form) => {
    form.addressForm.controls['plzNumber'].setValue(ADDRESSES[0].plzNumber);
    form.addressForm.controls['streetName'].setValue(ADDRESSES[0].streetName);
    form.addressForm.controls['cityName'].setValue(ADDRESSES[0].cityName);
    form.addressForm.controls['countryName'].setValue(ADDRESSES[0].countryName);
    return form;
  };

  beforeEach(async(() => {
    instantiateMocks();
    TestBed.configureTestingModule({
      declarations: [DashboardAddressesComponent],
      schemas: [...setup.getShemas()],
      imports: [
        ...setup.getImports()
      ],
      providers: [
        ...setup.getProviders(),
        DashboardAddressesComponent,
        { provide: AddressService, useValue: addressMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAddressesComponent);
    component = fixture.componentInstance;
    setComponentInputs(component);
    debugElement = fixture.debugElement;
  });

  it('should create address exstra compoenent', () => {
    expect(component).toBeTruthy();
  });

  it('should save a client s address', () => {
    component.setAddressForm();

    expect(component.addressForm.valid).toBeFalsy();
    component = setForm(component);
    expect(component.addressForm.valid).toBeTruthy();

    component.userId = null;
    component.saveAddress();

    expect(component.addresses).toBe(ADDRESSES);
  });

  it('should call a saveForClient', () => {
    const spy = spysOn(DashboardAddressesComponent, 'saveForClient').and.returnValue(ADDRESSES);
    component.setAddressForm();

    expect(component.addressForm.valid).toBeFalsy();
    component = setForm(component);
    expect(component.addressForm.valid).toBeTruthy();

    component.userId = null;
    component.saveAddress();

    expect(spy).toHaveBeenCalled();
  });

  it('should save a user s address', () => {
    component.setAddressForm();

    expect(component.addressForm.valid).toBeFalsy();
    component = setForm(component);
    expect(component.addressForm.valid).toBeTruthy();

    component.clientId = null;
    component.saveAddress();

    expect(component.addresses).toBe(ADDRESSES);
  });

  it('should call a saveForClient', () => {
    const spy = spysOn(DashboardAddressesComponent, 'saveForUser').and.returnValue(ADDRESSES);
    component.setAddressForm();

    expect(component.addressForm.valid).toBeFalsy();
    component = setForm(component);
    expect(component.addressForm.valid).toBeTruthy();

    component.clientId = null;
    component.saveAddress();

    expect(spy).toHaveBeenCalled();
  });
});
