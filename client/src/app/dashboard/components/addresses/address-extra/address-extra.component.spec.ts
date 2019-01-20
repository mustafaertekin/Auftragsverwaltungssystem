import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as setup from '@avs-ecosystem/services/mockServices/test-setup';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';

import { DashboardAddressesComponent } from '../addresses.component';
import { DashboardAddressesExtraComponent } from './address-extra.component';


describe('Address Extra Component', () => {
  let component: DashboardAddressesExtraComponent;
  let fixture: ComponentFixture<DashboardAddressesExtraComponent>;
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
    addressMockService = jasmine.createSpyObj(['delete', 'update', 'getByClientId', 'success', 'error']);
    addressMockService.update.and.returnValue(of(null));
    addressMockService.delete.and.returnValue(of(null));
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

  beforeEach(async(() => {
    instantiateMocks();
    TestBed.configureTestingModule({
      declarations: [DashboardAddressesExtraComponent, DashboardAddressesComponent],
      schemas: [...setup.getShemas()],
      imports: [
        ...setup.getImports()
      ],
      providers: [
        ...setup.getProviders(),
        DashboardAddressesComponent,
        DashboardAddressesExtraComponent,
        { provide: AddressService, useValue: addressMockService },
        { provide: NotificationService, useValue: addressMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAddressesExtraComponent);
    component = fixture.componentInstance;
    setComponentInputs(component);
    debugElement = fixture.debugElement;
  });

  it('should create address extra compoenent', () => {
    expect(component).toBeTruthy();
  });

  it('should update a client s address', () => {

    spysOn(DashboardAddressesComponent, 'getAllAddressesByClientId').and.returnValue(ADDRESSES);
    spysOn(DashboardAddressesExtraComponent, 'updateForClient').and.returnValue(ADDRESSES);

    component.setAddressForm();
    component.userId = null;
    component.address.cityName = 'olten';
    component.updateAddress();

    expect(component.updateForClient).toHaveBeenCalled();
    expect(component.address.cityName).toBe('olten');
  });

  it('should update a user s address', () => {

    spysOn(DashboardAddressesComponent, 'getAllAddressesByClientId').and.returnValue(ADDRESSES);
    spysOn(DashboardAddressesExtraComponent, 'updateForUser').and.returnValue(ADDRESSES);

    component.setAddressForm();
    component.clientId = null;
    component.address.cityName = 'rapperswill';
    component.updateAddress();

    expect(component.updateForUser).toHaveBeenCalled();
    expect(component.address.cityName).toBe('rapperswill');
  });

  it('should delete a address', () => {
    const getAllAddressesByClientId = spysOn(DashboardAddressesComponent, 'getAllAddressesByClientId').and.returnValue(ADDRESSES);
    fixture.detectChanges();
    component.deleteAddress(component.address.addressId);
    expect(getAllAddressesByClientId).toHaveBeenCalled();
  });
});
