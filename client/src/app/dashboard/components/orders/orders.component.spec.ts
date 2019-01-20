import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import * as setup from '@avs-ecosystem/services/mockServices/test-setup';
import { By } from '@angular/platform-browser';
import { DashboardOrdersComponent } from './orders.component';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import { routes } from 'src/app/home/home.routing';
import { ActivatedRoute, Router } from '@angular/router';


describe('Orders Component', () => {
  let component: DashboardOrdersComponent;
  let fixture: ComponentFixture<DashboardOrdersComponent>;
  let debugElement: DebugElement;
  let ordersMockService = null;
  let routerMockService = null;

  const ORDERS = [
    {
      billingAddressId: '111111-133-44444-5555',
      clientId: '01d1e4b1-5d18-4cc1-b7d1-f37fc2fdf1f7',
      clientSecret: null,
      creationDate: '2019-01-14T00:07:19.761Z',
      deletionDate: null,
      email: 'john@derjohn.ch',
      firstName: 'John',
      isActive: true,
      lastName: 'Nash',
      phone: '098765421',
      salutation: 'male',
      updatedOn: '2019-01-15T08:17:52.860Z',
      companyId: '111111-333-44444-5555',
      deliveryAddressId: '111111-433-44444-5555',
      deliveryDate: 'Wed Jan 16 2019 18:09:47 GMT+0100 (Mitteleuropäische Zeit)',
      description: 'not yet implemented',
      orderId: '111111-533-44444-5555',
      price: '240',
      status: 'opened',
      userId: '111111-633-44444-5555'
    }
  ];

  const instantiateMocks = () => {
    ordersMockService = jasmine.createSpyObj(['getAll', 'getByText']);
    ordersMockService.getAll.and.returnValue(of(ORDERS));
    ordersMockService.getByText.and.returnValue(of(null));

    routerMockService = jasmine.createSpyObj(['navigate']);
    routerMockService.navigate.and.returnValue(of(null));
  };

  const spysOn = (service, method) => {
    service = debugElement.injector.get(service);
    return spyOn(service, method);
  };

  beforeEach(async(() => {
    instantiateMocks();
    TestBed.configureTestingModule({
      declarations: [DashboardOrdersComponent],
      schemas: [...setup.getShemas()],
      imports: [
        ...setup.getImports()
      ],
      providers: [
        ...setup.getProviders(),
        DashboardOrdersComponent,
        { provide: OrderService, useValue: ordersMockService },
      ]
    })
      .compileComponents();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrdersComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create orders component', () => {
    expect(component).toBeTruthy();
  });

  it('should get all orders', () => {
    component.getAllOrders(null);
    expect(component.orders[0].orderId).toBe('111111-533-44444-5555');
    expect(component.orders[0].firstName).toBe('John');
    expect(component.orders[0].lastName).toBe('Nash');
    expect(component.orders[0].status).toBe('opened');
  });

  it('should close on mobile selection', () => {
    component.isMobile = true;
    component.closeOnMobileSelection(ORDERS[0]);
    expect(component.opened).toBeFalsy();
  });

});
