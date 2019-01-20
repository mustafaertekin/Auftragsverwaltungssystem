import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as setup from '@avs-ecosystem/services/mockServices/test-setup';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { ModelService } from '@avs-ecosystem/services/device-model.service';
import { DeviceServiceType } from '@avs-ecosystem/services/device-service-type.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import { DashboardOrderServicesComponent } from './order-services.component';


describe('Order Service Component', () => {
  let component: DashboardOrderServicesComponent;
  let fixture: ComponentFixture<DashboardOrderServicesComponent>;
  let debugElement: DebugElement;
  let deviceMockService = null;
  let modelMockService = null;
  let deviceServiceMockService = null;
  let notificationMockService = null;

  const DEVICES = [{
    deviceId: '12345-242',
    deviceName: 'Iphone',
    creationDate: 'Fri Jan 18 2019 23:17:36 GMT+0100',
    deletionDate: 'Fri Jan 18 2019 23:17:45 GMT+0100'
  },
  {
    deviceId: '12345-999',
    deviceName: 'Samsung',
    creationDate: 'Fri Jan 18 2019 23:17:36 GMT+0100',
    deletionDate: 'Fri Jan 18 2019 23:17:45 GMT+0100'
  }];

  const MODELS = [{
    deviceId: '12345-242',
    deviceModelId: '111-222',
    deviceModelName: 'LEYLA',
    creationDate: 'Fri Jan 18 2019 23:17:22 GMT+0100',
    deletionDate: 'Fri Jan 18 2019 23:17:49 GMT+0100'
  },
  {
    deviceId: '12345-999',
    deviceModelId: '333-444',
    deviceModelName: 'MECNUN',
    creationDate: 'Fri Jan 18 2019 23:17:24 GMT+0100',
    deletionDate: 'Fri Jan 18 2019 23:17:45 GMT+0100'
  }];

  const SERVICES = [{
    deviceId: '12345-242',
    deviceModelId: '111-222',
    deviceModelName: 'LEYLA',
    serviceId: '777-888',
    serviceName: 'hayde',
    price: 300
  },
  {
    deviceId: '12345-999',
    deviceModelId: '333-444',
    deviceModelName: 'MECNUN',
    serviceId: '777-888',
    serviceName: 'hayde',
    price: 400
  }];

  const SERVICE = [{ serviceId: '777-888', serviceName: 'hayde', price: 300 }];

  const instantiateMocks = () => {
    deviceMockService = jasmine.createSpyObj(['delete', 'update', 'getAll', 'create']);
    modelMockService = jasmine.createSpyObj(['delete', 'update', 'getAllByDeviceId', 'create']);
    deviceServiceMockService = jasmine.createSpyObj(['delete', 'update', 'getAllByModelId', 'getSelectedService']);
    notificationMockService = jasmine.createSpyObj(['delete', 'update', 'getByClientId', 'create']);
    deviceMockService.getAll.and.returnValue(of(DEVICES));
    modelMockService.getAllByDeviceId.and.returnValue(of(MODELS));
    deviceServiceMockService.getAllByModelId.and.returnValue(of(SERVICES));
    deviceServiceMockService.getSelectedService.and.returnValue(of(SERVICES));
  };

  const spysOn = (service, method) => {
    service = debugElement.injector.get(service);
    return spyOn(service, method);
  };

  beforeEach(async(() => {
    instantiateMocks();
    TestBed.configureTestingModule({
      declarations: [DashboardOrderServicesComponent],
      schemas: [...setup.getShemas()],
      imports: [
        ...setup.getImports()
      ],
      providers: [
        ...setup.getProviders(),
        DashboardOrderServicesComponent,
        { provide: DeviceService, useValue: deviceMockService },
        { provide: ModelService, useValue: modelMockService },
        { provide: DeviceServiceType, useValue: deviceServiceMockService },
        { provide: NotificationService, useValue: notificationMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrderServicesComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create order item compoenent', () => {
    expect(component).toBeTruthy();
  });

  it('should get all devices', () => {
    component.getAllDevices();
    expect(component.devices[0].deviceName).toBe(DEVICES[0].deviceName);
    expect(component.devices[1].deviceName).toBe(DEVICES[1].deviceName);
  });

  it('should get all models by device', () => {
    component.getModelsByDeviceId(DEVICES[0]);
    expect(component.models[0].deviceModelName).toBe(MODELS[0].deviceModelName);
    expect(component.models[1].deviceModelName).toBe(MODELS[1].deviceModelName);
  });

  it('should get all services by model', () => {
    component.getAllServicesByModelId(MODELS[0]);
    expect(component.services[0].serviceName).toBe(SERVICES[0].serviceName);
    expect(component.services[1].serviceName).toBe(SERVICES[1].serviceName);
  });

  it('should get selected service', () => {
    component.getSelectedService(SERVICE[0]);
    expect(component.service.serviceId).toBe(SERVICE[0].serviceId);
  });

});
