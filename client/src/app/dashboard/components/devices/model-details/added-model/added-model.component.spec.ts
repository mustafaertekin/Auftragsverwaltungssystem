import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModelExstraComponent } from './added-model.component';

describe('AddedModelComponent', () => {
  let component: DashboardModelExstraComponent;
  let fixture: ComponentFixture<DashboardModelExstraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardModelExstraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardModelExstraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
