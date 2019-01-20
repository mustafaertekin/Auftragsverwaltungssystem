import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as setup from '@avs-ecosystem/services/mockServices/test-setup';
import { By } from '@angular/platform-browser';

import { DashboardOrderItemServiceComponent } from './order-item-service.component';
import { FormBuilder } from '@angular/forms';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import { ModelService } from '@avs-ecosystem/services/device-model.service';
import { OrderItemService } from '@avs-ecosystem/services/order-item.service';
import { DeviceServiceType } from '@avs-ecosystem/services/device-service-type.service';
import { ActivatedRoute, Router } from '@angular/router';


describe('Order Item Service Component', () => {
  let component: DashboardOrderItemServiceComponent;
  let fixture: ComponentFixture<DashboardOrderItemServiceComponent>;
  let debugElement: DebugElement;
  let orderItemServiceMockService = null;

  const DEVICES = [
    { deviceName: 'iPhone', deviceId: '1212-212-12-12-12', creationDate: '111-233-444-555',
    deletionDate: 'Sat Jan 19 2019 15:27:07'},
    { deviceName: 'Samsung', deviceId: '1213-212-13-13-13', creationDate: '111-233-444-555',
    deletionDate: 'Sat Jan 19 2019 15:27:07' }
  ];

  const DEVICEMODELS = {
    deviceModelId: '111-233-444-555',
    deviceId: '1212-212-12-12-12',
    deviceModelName: 'Galaxy S9',
    creationDate: 'Sat Jan 19 2019 15:27:07',
    deletionDate: 'Sat Jan 19 2019 15:27:07'
  };

  const instantiateMocks = () => {
    orderItemServiceMockService = jasmine.createSpyObj([
      'getAll', 'getAllByDeviceId', 'getAllByModelId', 'deleteOrderService', 'updateItem', 'createOrderService']);
    orderItemServiceMockService.getAll.and.returnValue(of(DEVICES));
    orderItemServiceMockService.getAllByDeviceId.and.returnValue(of(DEVICEMODELS));
    orderItemServiceMockService.getAllByModelId.and.returnValue(of(null));
    orderItemServiceMockService.deleteOrderService.and.returnValue(of(DEVICES));
    orderItemServiceMockService.updateItem.and.returnValue(of(DEVICES));
    orderItemServiceMockService.createOrderService.and.returnValue(of(DEVICES));
  };

  const spysOn = (service, method) => {
    service = debugElement.injector.get(service);
    return spyOn(service, method);
  };

  beforeEach(async(() => {
    instantiateMocks();
    TestBed.configureTestingModule({
      declarations: [DashboardOrderItemServiceComponent],
      schemas: [...setup.getShemas()],
      imports: [
        ...setup.getImports()
      ],
      providers: [
        ...setup.getProviders(),
        DashboardOrderItemServiceComponent,
        { provide: DeviceService, useValue: orderItemServiceMockService },
        { provide: ModelService, useValue: orderItemServiceMockService },
        { provide: OrderItemService, useValue: orderItemServiceMockService },
        { provide: DeviceServiceType, useValue: orderItemServiceMockService },
        { provide: ModelService, useValue: orderItemServiceMockService },
        { provide: ActivatedRoute, useValue: orderItemServiceMockService },
        { provide: Router, useValue: orderItemServiceMockService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrderItemServiceComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create order item service compoenent', () => {
    expect(component).toBeTruthy();
  });

  it('should get devices', () => {
    component.getDevices();
    expect(component.devices[0].deviceName).toBe(DEVICES[0].deviceName);
    expect(component.devices[0].deviceId).toBe(DEVICES[0].deviceId);
    expect(component.devices[1].deviceName).toBe(DEVICES[1].deviceName);
    expect(component.devices[1].deviceId).toBe(DEVICES[1].deviceId);
  });

  it('should get device models', () => {
    component.getModelsByDeviceId(DEVICES);
    expect(component.models.deviceModelId).toBe(DEVICEMODELS.deviceModelId);
  });

});
