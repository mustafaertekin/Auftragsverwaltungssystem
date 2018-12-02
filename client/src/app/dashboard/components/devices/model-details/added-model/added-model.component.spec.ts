import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedModelComponent } from './added-model.component';

describe('AddedModelComponent', () => {
  let component: AddedModelComponent;
  let fixture: ComponentFixture<AddedModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
