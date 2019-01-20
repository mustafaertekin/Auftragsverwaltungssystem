import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as setup from '@avs-ecosystem/services/mockServices/test-setup';
import { By } from '@angular/platform-browser';


import { DashboardOrderItemComponent } from './order-item.component';
import { OrderItemService } from '@avs-ecosystem/services/order-item.service';


describe('Order Item Component', () => {
  let component: DashboardOrderItemComponent;
  let fixture: ComponentFixture<DashboardOrderItemComponent>;
  let debugElement: DebugElement;
  let orderMockService = null;

  const ORDERS = [
    {
      status: 'opened',
      price: '111',
      creationDate: 'Fri Jan 18 2019 23:17:46 GMT+0100',
      clientId: '111111-133-44444-5555',
      orderId: '111111-233-44444-5555'
    }
  ];

  const instantiateMocks = () => {
    orderMockService = jasmine.createSpyObj(['delete', 'update', 'getByClientId', 'create']);
    orderMockService.update.and.returnValue(of(null));
  ;
  orderMockService.getByClientId.and.returnValue(of(ORDERS));
  };

  const spysOn = (service, method) => {
    service = debugElement.injector.get(service);
    return spyOn(service, method);
  };

 
  const setComponentInputs = (componentReference) => {
    componentReference.address = ORDERS[0];

    componentReference.clientId = ORDERS[0].clientId;
    componentReference.orderId = ORDERS[0].orderId;
  };
  

  beforeEach(async(() => {
    instantiateMocks();
    TestBed.configureTestingModule({
      declarations: [DashboardOrderItemComponent],
      schemas: [...setup.getShemas()],
      imports: [
        ...setup.getImports()
      ],
      providers: [
        ...setup.getProviders(),
        DashboardOrderItemComponent,
        { provide: OrderItemService, useValue: orderMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrderItemComponent);
    component = fixture.componentInstance;
    component.currentId = ORDERS[0].orderId;
    component.order = ORDERS[0];
    setComponentInputs(component);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create order item compoenent', () => {
    expect(component).toBeTruthy();
  });


  it('should check if isHighligted true', () => {
    expect(component.isHighlighted).toBeTruthy();
  });


  it('should check if isHighligted false', () => {
    component.currentId = 'something something';
    fixture.detectChanges();
    expect(component.checkStatus()).toBeFalsy();
  });

 

  
});
