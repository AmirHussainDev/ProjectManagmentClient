import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerDrawerComponent } from './create-customer-drawer.component';

describe('CreateCustomerDrawerComponent', () => {
  let component: CreateCustomerDrawerComponent;
  let fixture: ComponentFixture<CreateCustomerDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCustomerDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCustomerDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
